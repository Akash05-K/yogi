-- Run once in the Supabase SQL editor. All contact data is server-only.
create table if not exists public.consultation_requests (
 id uuid primary key default gen_random_uuid(),
 reference text unique not null,
 service text not null check (service in ('Horoscope consultation','Marriage compatibility')),
 mode text not null check(mode in ('Video call','Audio call')),
 language text not null check(language in ('Tamil','Telugu','English')),
 preferred_date date not null,
 preferred_period text not null check(preferred_period in ('Morning','Afternoon','Evening')),
 name text not null, email text not null, phone text not null, note text not null default '',
 contact_consent boolean not null default true,
 status text not null default 'requested' check(status in ('requested','contacted','confirmed','cancelled','completed')),
 created_at timestamptz not null default now()
);
alter table public.consultation_requests enable row level security;
revoke all on public.consultation_requests from anon, authenticated;
create or replace function public.submit_consultation_request(p_service text,p_mode text,p_language text,p_date date,p_period text,p_name text,p_email text,p_phone text,p_note text)
returns text language plpgsql security definer set search_path=public as $$
declare new_reference text;
begin
 perform pg_advisory_xact_lock(hashtextextended(lower(p_email),0));
 if exists(select 1 from consultation_requests where email=lower(p_email) and created_at>now()-interval '5 minutes') then raise exception 'request_limit'; end if;
 new_reference := 'YA-' || upper(replace(gen_random_uuid()::text,'-',''));
 insert into consultation_requests(reference,service,mode,language,preferred_date,preferred_period,name,email,phone,note)
 values(new_reference,p_service,p_mode,p_language,p_date,p_period,p_name,lower(p_email),p_phone,p_note);
 return new_reference;
end; $$;
revoke all on function public.submit_consultation_request(text,text,text,date,text,text,text,text,text) from public,anon,authenticated;
grant execute on function public.submit_consultation_request(text,text,text,date,text,text,text,text,text) to service_role;
