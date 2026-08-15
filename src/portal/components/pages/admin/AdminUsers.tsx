import type { JSX } from 'react';
import { useState, useMemo, useCallback, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, UserPlus, MoreHorizontal, RefreshCw, LogIn, X, Filter, Link2, Info, Download, Upload } from 'lucide-react';
import { parseMemberImportFile, exportMembersToWorkbook, exportMembersToCsv } from '@/portal/lib/memberSheets';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/portal/components/ui/tooltip';

function InfoTip({ text }: { text: string }) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="inline h-3 w-3 text-slate-400 hover:text-slate-600 cursor-help ml-1 shrink-0" />
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs text-xs font-normal">
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
import { toast } from 'sonner';
import { cn } from '@/portal/lib/utils';
import { apiFetch } from '@/portal/api/client';
import { useAdminCreateProfileLink } from '@/portal/hooks/useProfileLinks';

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/portal/components/ui/table';
import { Input } from '@/portal/components/ui/input';
import { Button } from '@/portal/components/ui/button';
import { Badge } from '@/portal/components/ui/badge';
import { Card } from '@/portal/components/ui/card';
import FadedScroll from '@/portal/components/ui/faded-scroll';
import { TableSkeleton } from '@/portal/components/ui/admin-skeletons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/portal/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/portal/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/portal/components/ui/dialog';
import { Label } from '@/portal/components/ui/label';
import { useAuth } from '@/portal/hooks/useAuth';
import { usePrograms, useCohorts, useCohortEnrollments } from '@/portal/hooks/usePrograms';
import { enrollUserApi, enrollUserInCohortApi } from '@/portal/api/programs';
import { AdminUserDialog, type AdminUserFormValues } from './AdminUserDialog';
import type { MockUser } from '@/portal/data/mock';

const ITEMS_PER_PAGE = 10;


function redactEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return '***';
  return `${local[0]}***@${domain}`;
}

function tierBadgeClass(tier: string): string {
  const m: Record<string, string> = {
    startup: 'bg-cyan-100 text-cyan-700',
    cxo: 'bg-amber-100 text-amber-700',
    vc: 'bg-emerald-100 text-emerald-700',
    admin: 'bg-blue-100 text-blue-700',
    dev: 'bg-purple-100 text-purple-700',
  };
  return m[tier] ?? 'bg-gray-100 text-gray-700';
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}


interface Filters {
  search: string;
  tier: string;
  program: string;
  cohort: string;
  company: string;
  title: string;
  dateFrom: string;
  dateTo: string;
}

const EMPTY_FILTERS: Filters = {
  search: '',
  tier: 'all',
  program: 'all',
  cohort: 'all',
  company: '',
  title: '',
  dateFrom: '',
  dateTo: '',
};

function LinkProfileDialog({
  open,
  user,
  allUsers,
  onOpenChange,
}: {
  open: boolean;
  user: MockUser | null;
  /** All users in the system; the picker filters this against the search box. */
  allUsers: MockUser[];
  onOpenChange: (open: boolean) => void;
}) {
  const [linkedUserId, setLinkedUserId] = useState('');
  const [relationshipLabel, setRelationshipLabel] = useState('');
  const [search, setSearch] = useState('');
  const createLink = useAdminCreateProfileLink();

  const reset = () => {
    setLinkedUserId('');
    setRelationshipLabel('');
    setSearch('');
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  // Filter the picker — exclude the current user (can't link to self) and
  // any user whose name/email/company doesn't match the search query.
  const matchingUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allUsers
      .filter((u) => u.id !== user?.id)
      .filter((u) => {
        if (q.length === 0) return true;
        return (
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          (u.companyAffiliation ?? '').toLowerCase().includes(q)
        );
      })
      .slice(0, 50); // cap the rendered list to keep the dialog snappy
  }, [allUsers, user?.id, search]);

  const selectedTarget = useMemo(
    () => allUsers.find((u) => u.id === linkedUserId) ?? null,
    [allUsers, linkedUserId],
  );

  const handleSubmit = async () => {
    if (!user || !linkedUserId) return;
    try {
      await createLink.mutateAsync({
        userId: user.id,
        linkedUserId,
        relationshipLabel: relationshipLabel.trim() || null,
      });
      toast.success(`Linked ${user.name} ↔ ${selectedTarget?.name ?? 'profile'}`);
      handleOpenChange(false);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Failed to link profile');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Link Profiles</DialogTitle>
        </DialogHeader>
        <p className="text-xs text-slate-500 -mt-1 mb-2">
          Connect two GCXO accounts that belong to the same person. After
          linking, the profile switcher in the navigation bar lets them
          swap between accounts without logging out.
        </p>
        <div className="space-y-4 py-2">
          <div className="grid gap-2">
            <Label>Primary profile</Label>
            <div className="rounded-md border bg-slate-50 px-3 py-2 text-sm">
              <p className="font-medium">{user?.name}</p>
              <p className="text-slate-500 text-xs">{user?.email}</p>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="link-search">Find another profile</Label>
            <Input
              id="link-search"
              placeholder="Search by name, email, or company…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            <div className="max-h-56 overflow-y-auto rounded-md border bg-white">
              {matchingUsers.length === 0 ? (
                <p className="px-3 py-6 text-center text-xs text-slate-400">
                  No matching profiles
                </p>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {matchingUsers.map((u) => {
                    const selected = u.id === linkedUserId;
                    return (
                      <li key={u.id}>
                        <button
                          type="button"
                          onClick={() => setLinkedUserId(u.id)}
                          className={cn(
                            'flex w-full items-start justify-between gap-2 px-3 py-2 text-left transition-colors',
                            selected
                              ? 'bg-indigo-50 hover:bg-indigo-50'
                              : 'hover:bg-slate-50',
                          )}
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">
                              {u.name}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                              {u.email}
                              {u.companyAffiliation ? ` · ${u.companyAffiliation}` : ''}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={cn(
                              'shrink-0 text-[10px] uppercase',
                              selected && 'border-indigo-300 text-indigo-700',
                            )}
                          >
                            {u.tier}
                          </Badge>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="link-label">Relationship label (optional)</Label>
            <Input
              id="link-label"
              placeholder="e.g. Day job, Founder side hustle, VC partner"
              value={relationshipLabel}
              onChange={(e) => setRelationshipLabel(e.target.value)}
              maxLength={120}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button
            disabled={createLink.isPending || !linkedUserId}
            onClick={() => void handleSubmit()}
          >
            {createLink.isPending ? 'Linking…' : 'Link Profiles'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminUsers(): JSX.Element {
  const { users, startups, user: currentUser, isAdmin, beginProxySession, createUser, updateUserById, removeUserById, refreshCatalog, catalogHydrated } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Real API data for program/cohort filters
  const { data: programsData } = usePrograms();
  const programs = programsData ?? [];
  const [filters, setFilters] = useState<Filters>(() => ({
    ...EMPTY_FILTERS,
    cohort: searchParams.get('cohort') ?? 'all',
    program: searchParams.get('program') ?? 'all',
    tier: searchParams.get('tier') ?? 'all',
  }));
  const [showFilters, setShowFilters] = useState(() =>
    filters.cohort !== 'all' || filters.program !== 'all' || filters.company !== '' || filters.title !== '' || filters.dateFrom !== '' || filters.dateTo !== ''
  );
  const [page, setPage] = useState(1);
  const [dialogMode, setDialogMode] = useState<'view' | 'edit' | 'create' | null>(null);
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [linkProfileUser, setLinkProfileUser] = useState<MockUser | null>(null);

  // Cohort data for filters — dynamically fetched based on selected program/cohort
  const programFilterId = filters.program !== 'all' ? filters.program : (programs.length === 1 ? programs[0].id : null);
  const { data: cohortsData } = useCohorts(programFilterId);
  const filterCohorts = cohortsData ?? [];
  const { data: cohortEnrollmentsData } = useCohortEnrollments(
    programFilterId,
    filters.cohort !== 'all' ? filters.cohort : null,
  );
  const cohortUserIds = useMemo(
    () => new Set((cohortEnrollmentsData ?? []).map((e) => e.user_id)),
    [cohortEnrollmentsData],
  );

  const updateFilter = useCallback((key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }, []);

  const handleTabClick = useCallback((tabTier: string) => {
    setFilters((prev) => ({
      search: prev.search,
      tier: tabTier,
      program: 'all',
      cohort: 'all',
      company: '',
      title: '',
      dateFrom: '',
      dateTo: '',
    }));
    setPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(EMPTY_FILTERS);
    setSearchParams({});
    setPage(1);
  }, [setSearchParams]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.tier !== 'all') count++;
    if (filters.program !== 'all') count++;
    if (filters.cohort !== 'all') count++;
    if (filters.company) count++;
    if (filters.title) count++;
    if (filters.dateFrom) count++;
    if (filters.dateTo) count++;
    return count;
  }, [filters]);

  const handleLoginAs = async (targetUser: MockUser): Promise<void> => {
    // Stash the admin id for the "Return to Admin" banner UI. The actual token
    // capture happens inside beginProxySession so restoration can recover the
    // admin's real JWT (demoLoginAs would fail on non-demo admins like yahvin-dev).
    sessionStorage.setItem('gcio_proxy_admin_id', currentUser.id);
    const result = await beginProxySession(targetUser.id);
    if (result) {
      toast.success(`Now viewing as ${targetUser.name}`);
      navigate('/dashboard');
    } else {
      sessionStorage.removeItem('gcio_proxy_admin_id');
      sessionStorage.removeItem('gcio_proxy_admin_token');
      toast.error('Failed to switch user.');
    }
  };

  const tierCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    users.forEach((u) => {
      counts[u.tier] = (counts[u.tier] ?? 0) + 1;
    });
    return counts;
  }, [users]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refreshCatalog();
      toast.success('User data refreshed.');
    } catch {
      toast.error('Failed to refresh data.');
    } finally {
      setRefreshing(false);
    }
  }, [refreshCatalog]);

  const handleFileImport = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    try {
      const rows = await parseMemberImportFile(file);
      if (rows.length === 0) {
        toast.error('No valid rows found in file.');
        return;
      }
      const payload = rows.map((r) => ({
        name: r.name,
        email: r.email,
        phone: r.phone,
        linkedin: r.linkedin,
        company_affiliation: r.companyAffiliation,
        role: r.role,
        about_me: r.aboutMe,
        tier: r.tier,
      }));
      const result = await apiFetch<{ created: number; skipped: number; errors: Array<{ email: string; error: string }>; total: number }>('/users/bulk-import', {
        method: 'POST',
        body: { users: payload },
      });
      toast.success(`Imported ${result.created} new members (${result.skipped} duplicates skipped)`);
      if (result.errors.length > 0) {
        toast.error(`${result.errors.length} rows had errors`);
      }
      await refreshCatalog();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Import failed');
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, [refreshCatalog]);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      if (filters.tier !== 'all' && u.tier !== filters.tier) return false;

      if (filters.cohort !== 'all') {
        if (!cohortUserIds.has(u.id)) return false;
      }

      if (filters.company && !u.companyAffiliation.toLowerCase().includes(filters.company.toLowerCase())) return false;

      if (filters.title && !u.role.toLowerCase().includes(filters.title.toLowerCase())) return false;

      if (filters.dateFrom) {
        const from = new Date(filters.dateFrom);
        if (new Date(u.createdAt) < from) return false;
      }

      if (filters.dateTo) {
        const to = new Date(filters.dateTo);
        to.setHours(23, 59, 59, 999);
        if (new Date(u.createdAt) > to) return false;
      }

      const q = filters.search.toLowerCase();
      if (q && !u.name.toLowerCase().includes(q) && !u.companyAffiliation.toLowerCase().includes(q) && !u.role.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) return false;

      return true;
    });
  }, [filters, users]);

  const handleExport = useCallback((format: 'xlsx' | 'csv') => {
    const data = filtered.map((u) => ({
      name: u.name,
      email: u.email,
      phone: u.phone,
      linkedin: u.linkedin,
      companyAffiliation: u.companyAffiliation,
      role: u.role,
      tier: u.tier,
      onboardingStatus: u.onboardingStatus,
      lastLoginAt: u.lastLoginAt,
      createdAt: u.createdAt,
    }));
    const filename = `gcxo-members-${new Date().toISOString().slice(0, 10)}.${format}`;
    if (format === 'xlsx') exportMembersToWorkbook(data, filename);
    else exportMembersToCsv(data, filename);
    toast.success(`Exported ${data.length} members`);
  }, [filtered]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paged = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const openDialog = (mode: 'view' | 'edit' | 'create', user?: MockUser): void => {
    setDialogMode(mode);
    setSelectedUser(user ?? null);
  };

  const handleSave = async (values: AdminUserFormValues): Promise<void> => {
    if (!values.name || !values.email || !values.companyAffiliation || !values.role) {
      toast.error('Please complete the required user fields.');
      return;
    }

    try {
      if (dialogMode === 'create') {
        await createUser(values as unknown as Parameters<typeof createUser>[0]);
        if (values.sandbox) {
          toast.success('[SANDBOX] Test email sent to your inbox — no user was created.');
        } else {
          toast.success('User created.');
        }
      } else if (selectedUser) {
        const updates = {
          ...values,
          advisoryHourlyRate: values.advisoryHourlyRate ? parseFloat(values.advisoryHourlyRate) || null : null,
        };
        await updateUserById(selectedUser.id, updates);
        toast.success('User updated.');
      }

      // Enroll in program if selected
      if (values.programId && values.programId !== '') {
        try {
          await enrollUserApi(values.programId, {
            user_email: values.email,
            user_name: values.name,
            role: (values.tier === 'cxo' || values.tier === 'advisor') ? 'cxo' : 'startup',
          });
          toast.success('Enrolled in program.');
        } catch {
          // May fail if already enrolled — that's fine
        }

        // Enroll in circle if selected
        if (values.circleId && values.circleId !== '') {
          try {
            await enrollUserInCohortApi(values.programId, values.circleId, {
              user_email: values.email,
              role: (values.tier === 'cxo' || values.tier === 'advisor') ? 'cxo' : 'startup',
            });
            toast.success('Added to circle.');
          } catch {
            // May fail if already in circle
          }
        }
      }
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Failed to save user');
    }

    setDialogMode(null);
    setSelectedUser(null);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Users ({users.length})
          </h1>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={(e) => void handleFileImport(e)}
          />
          <Button
            variant="outline"
            size="sm"
            disabled={importing}
            onClick={() => fileInputRef.current?.click()}
            title="Import members from Excel/CSV"
          >
            <Download className="h-4 w-4 mr-1" />
            {importing ? 'Importing...' : 'Import'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('xlsx')}
            title="Export filtered members to Excel"
          >
            <Upload className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={refreshing}
            onClick={handleRefresh}
            title="Refresh user data"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
          <Button
            className="gap-1"
            onClick={() => openDialog('create')}
          >
            <UserPlus className="h-4 w-4" /> Create User
          </Button>
        </div>
      </div>

      {/* Role/Tier quick tabs */}
      <div className="inline-flex flex-wrap rounded-lg bg-slate-100 p-1 mb-4 gap-1">
        {[
          { id: 'all', label: 'All Users', count: users.length },
          { id: 'cxo', label: 'Cxo', count: tierCounts['cxo'] ?? 0 },
          { id: 'startup', label: 'Startup', count: tierCounts['startup'] ?? 0 },
          { id: 'vc', label: 'Vc', count: tierCounts['vc'] ?? 0 },
          { id: 'admin', label: 'Admin', count: tierCounts['admin'] ?? 0 },
          { id: 'dev', label: 'Dev', count: tierCounts['dev'] ?? 0 },
        ].map((tab) => {
          const isActive = filters.tier === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                'rounded-md px-3.5 py-1.5 text-xs font-medium transition-all flex items-center gap-1.5',
                isActive
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60',
              )}
            >
              <span>{tab.label}:</span>
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[10px] font-bold',
                  isActive
                    ? 'bg-slate-100 text-slate-900'
                    : 'bg-slate-200/80 text-slate-600',
                )}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search + Filter Toggle */}
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search by name, email, company, or role..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant={showFilters ? 'default' : 'outline'}
          size="sm"
          onClick={() => setShowFilters((v) => !v)}
          className="gap-1.5"
        >
          <Filter className="h-3.5 w-3.5" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 rounded-full bg-white/20 px-1.5 text-xs font-bold">
              {activeFilterCount}
            </span>
          )}
        </Button>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-slate-500 gap-1">
            <X className="h-3 w-3" />
            Clear all
          </Button>
        )}
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Tier</label>
              <Select value={filters.tier} onValueChange={(v) => updateFilter('tier', v)}>
                <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="startup">Startup</SelectItem>
                  <SelectItem value="cxo">CxO</SelectItem>
                  <SelectItem value="vc">VC</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="dev">Dev</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Program</label>
              <Select value={filters.program} onValueChange={(v) => { updateFilter('program', v); if (v === 'all') updateFilter('cohort', 'all'); }}>
                <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  {programs.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Cohort</label>
              <Select value={filters.cohort} onValueChange={(v) => updateFilter('cohort', v)}>
                <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cohorts</SelectItem>
                  {filterCohorts
                    .filter((c) => filters.program === 'all' || c.program_id === filters.program)
                    .map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Company</label>
              <Input
                placeholder="Filter by company..."
                value={filters.company}
                onChange={(e) => updateFilter('company', e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Title / Role</label>
              <Input
                placeholder="Filter by title..."
                value={filters.title}
                onChange={(e) => updateFilter('title', e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Created From</label>
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => updateFilter('dateFrom', e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Created To</label>
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => updateFilter('dateTo', e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>

          {/* Active filter badges */}
          {activeFilterCount > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {filters.tier !== 'all' && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  Tier: {filters.tier}
                  <button onClick={() => updateFilter('tier', 'all')}><X className="h-2.5 w-2.5" /></button>
                </Badge>
              )}
              {filters.program !== 'all' && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  Program: {programs.find((p) => p.id === filters.program)?.name ?? filters.program}
                  <button onClick={() => { updateFilter('program', 'all'); updateFilter('cohort', 'all'); }}><X className="h-2.5 w-2.5" /></button>
                </Badge>
              )}
              {filters.cohort !== 'all' && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  Cohort: {filterCohorts.find((c) => c.id === filters.cohort)?.name ?? filters.cohort}
                  <button onClick={() => updateFilter('cohort', 'all')}><X className="h-2.5 w-2.5" /></button>
                </Badge>
              )}
              {filters.company && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  Company: {filters.company}
                  <button onClick={() => updateFilter('company', '')}><X className="h-2.5 w-2.5" /></button>
                </Badge>
              )}
              {filters.title && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  Title: {filters.title}
                  <button onClick={() => updateFilter('title', '')}><X className="h-2.5 w-2.5" /></button>
                </Badge>
              )}
              {filters.dateFrom && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  From: {filters.dateFrom}
                  <button onClick={() => updateFilter('dateFrom', '')}><X className="h-2.5 w-2.5" /></button>
                </Badge>
              )}
              {filters.dateTo && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  To: {filters.dateTo}
                  <button onClick={() => updateFilter('dateTo', '')}><X className="h-2.5 w-2.5" /></button>
                </Badge>
              )}
            </div>
          )}
        </div>
      )}

      {/* Table — first-load skeleton before the catalog has hydrated.
          Once `catalogHydrated` flips we always show the real table, even
          if `users` is empty (so admins can see "0 users" truthfully). */}
      {!catalogHydrated && users.length === 0 ? (
        <Card className="p-4">
          <TableSkeleton rows={8} columns={5} />
        </Card>
      ) : (
      <Card>
        <FadedScroll variant="subtle">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden sm:table-cell">Company</TableHead>
              <TableHead className="hidden lg:table-cell">Role</TableHead>
              <TableHead>Tier<span className="hidden sm:inline"><InfoTip text="Account type: CxO = advisory executive, Startup = startup team member, VC = venture capital, Admin/Dev = platform operators." /></span></TableHead>
              <TableHead>Status<span className="hidden sm:inline"><InfoTip text="Onboarding status: Pending = invite sent but not started. In Progress = user opened the link. Onboarded = account setup complete." /></span></TableHead>
              <TableHead className="hidden lg:table-cell">Last Active</TableHead>
              <TableHead className="hidden xl:table-cell">Created</TableHead>
              <TableHead className="w-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">
                  {u.name}
                  {u.isStudent && (
                    <Badge className="ml-2 bg-sky-100 text-sky-700 text-[10px] py-0 px-1.5">STUDENT</Badge>
                  )}
                </TableCell>
                <TableCell className="hidden text-slate-500 md:table-cell">
                  {redactEmail(u.email)}
                </TableCell>
                <TableCell className="hidden sm:table-cell">{u.companyAffiliation}</TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-slate-600">{u.role}</TableCell>
                <TableCell>
                  <Badge className={tierBadgeClass(u.tier)}>
                    {u.tier.toUpperCase()}
                  </Badge>
                  {u.tier === 'cxo' && u.enterpriseSize && (
                    <Badge className="ml-1 bg-slate-100 text-slate-700 text-[10px] py-0 px-1.5">
                      {u.enterpriseSize === 'L' ? 'Large' : u.enterpriseSize === 'M' ? 'Mid' : 'SMB'}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {(() => {
                    const s = u.onboardingStatus ?? 'none';
                    if (s === 'complete' || s === 'completed') return <Badge className="bg-green-100 text-green-700">Onboarded</Badge>;
                    if (s === 'started' || s === 'in_progress') return <Badge className="bg-amber-100 text-amber-700">In Progress</Badge>;
                    if (s === 'pending' || s === 'sent') return <Badge className="bg-blue-100 text-blue-700">Invite Sent</Badge>;
                    return <Badge className="bg-gray-100 text-gray-700">Not Invited</Badge>;
                  })()}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {(() => {
                    if (!u.lastLoginAt) return <span className="text-slate-300 text-xs">Never</span>;
                    const loginDate = new Date(u.lastLoginAt);
                    const diffMs = Date.now() - loginDate.getTime();
                    const diffMin = diffMs / 60000;
                    const isOnline = diffMin < 15;
                    const label = diffMin < 1 ? 'Just now'
                      : diffMin < 60 ? `${Math.floor(diffMin)}m ago`
                      : diffMin < 1440 ? `${Math.floor(diffMin / 60)}h ago`
                      : `${Math.floor(diffMin / 1440)}d ago`;
                    return (
                      <span className="flex items-center gap-1.5 text-xs text-slate-500">
                        {isOnline ? (
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full h-2 w-2 bg-slate-300" />
                        )}
                        {label}
                      </span>
                    );
                  })()}
                </TableCell>
                <TableCell className="hidden text-slate-500 xl:table-cell">
                  {formatDate(u.createdAt)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => openDialog('view', u)}
                      >
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openDialog('edit', u)}
                      >
                        Edit
                      </DropdownMenuItem>
                      {isAdmin && currentUser && u.id !== currentUser.id && (
                        <DropdownMenuItem
                          onClick={() => handleLoginAs(u)}
                        >
                          <LogIn className="mr-2 h-4 w-4" />
                          Login As
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => setLinkProfileUser(u)}
                      >
                        <Link2 className="mr-2 h-4 w-4" />
                        Link Profile
                      </DropdownMenuItem>
                      {(u.onboardingStatus === 'none' || u.onboardingStatus === 'pending' || u.onboardingStatus === 'started' || !u.onboardingStatus) && (
                        <DropdownMenuItem
                          onClick={async () => {
                            try {
                              const res = await apiFetch<{ message: string }>(`/users/${u.id}/resend-onboarding`, { method: 'POST' });
                              toast.success(res.message || 'Onboarding link sent');
                              void refreshCatalog();
                            } catch (err: any) {
                              toast.error(err.message || 'Failed to resend onboarding link');
                            }
                          }}
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Resend Onboarding Link
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          removeUserById(u.id);
                          toast.success('User deleted.');
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {paged.length === 0 && users.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="p-0">
                  <div className="p-4">
                    <TableSkeleton rows={8} columns={5} />
                  </div>
                </TableCell>
              </TableRow>
            )}
            {paged.length === 0 && users.length > 0 && (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-slate-400">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </FadedScroll>
      </Card>
      )}

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Page {page} of {totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      <AdminUserDialog
        open={dialogMode !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDialogMode(null);
            setSelectedUser(null);
          }
        }}
        mode={dialogMode ?? 'view'}
        user={selectedUser}
        onSave={handleSave}
      />

      <LinkProfileDialog
        open={linkProfileUser !== null}
        user={linkProfileUser}
        allUsers={users}
        onOpenChange={(open) => { if (!open) setLinkProfileUser(null); }}
      />
    </div>
  );
}
