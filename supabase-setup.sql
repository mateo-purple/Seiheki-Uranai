create table if not exists public.mezamashi_state (
  storage_key text primary key,
  value jsonb not null default 'null'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.mezamashi_state enable row level security;

drop policy if exists "mezamashi_state_select" on public.mezamashi_state;
drop policy if exists "mezamashi_state_insert" on public.mezamashi_state;
drop policy if exists "mezamashi_state_update" on public.mezamashi_state;
drop policy if exists "mezamashi_state_delete" on public.mezamashi_state;

create policy "mezamashi_state_select"
on public.mezamashi_state
for select
to anon
using (true);

create policy "mezamashi_state_insert"
on public.mezamashi_state
for insert
to anon
with check (true);

create policy "mezamashi_state_update"
on public.mezamashi_state
for update
to anon
using (true)
with check (true);

insert into storage.buckets (id, name, public)
values ('mezamashi-images', 'mezamashi-images', true)
on conflict (id) do update set public = true;

drop policy if exists "mezamashi_images_select" on storage.objects;
drop policy if exists "mezamashi_images_insert" on storage.objects;
drop policy if exists "mezamashi_images_update" on storage.objects;
drop policy if exists "mezamashi_images_delete" on storage.objects;

create policy "mezamashi_images_select"
on storage.objects
for select
to anon
using (bucket_id = 'mezamashi-images');

create policy "mezamashi_images_insert"
on storage.objects
for insert
to anon
with check (bucket_id = 'mezamashi-images');
