import React from 'react';
import AdminLoginClient from './ui/AdminLoginClient';

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ next?: string | string[] }>;
}) {
  const sp = (await searchParams) || {};
  const next = Array.isArray(sp.next) ? sp.next[0] : sp.next;

  return <AdminLoginClient nextPath={next || '/admin'} />;
}

