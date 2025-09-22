-- Create profiles table
create table if not exists public.profiles (
    id uuid references auth.users(id) on delete cascade not null primary key,
    updated_at timestamp with time zone default timezone('utc'::text, now()),
    username text unique,
    full_name text,
    avatar_url text,
    website text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,

    constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Create policies for profiles
create policy "Public profiles are viewable by everyone." on public.profiles
    for select using (true);

create policy "Users can insert their own profile." on public.profiles
    for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
    for update using (auth.uid() = id);

-- Create a function to handle new user signups
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

-- Create trigger for new user signups
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create posts table for demo purposes
create table if not exists public.posts (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    title text not null,
    content text,
    author_id uuid references public.profiles(id) on delete cascade not null,
    published boolean default false,
    slug text unique
);

-- Enable RLS for posts
alter table public.posts enable row level security;

-- Posts policies
create policy "Anyone can view published posts" on public.posts
    for select using (published = true);

create policy "Authors can view their own posts" on public.posts
    for select using (auth.uid() = author_id);

create policy "Authors can create posts" on public.posts
    for insert with check (auth.uid() = author_id);

create policy "Authors can update their own posts" on public.posts
    for update using (auth.uid() = author_id);

create policy "Authors can delete their own posts" on public.posts
    for delete using (auth.uid() = author_id);

-- Create updated_at trigger for posts
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

create trigger handle_posts_updated_at
    before update on public.posts
    for each row
    execute procedure public.handle_updated_at();

-- Create indexes for better performance
create index if not exists profiles_username_idx on public.profiles (username);
create index if not exists posts_author_id_idx on public.posts (author_id);
create index if not exists posts_published_idx on public.posts (published);
create index if not exists posts_created_at_idx on public.posts (created_at desc);
