"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/pages/api/supbaseClient';

export default function VerifyPage() {
  const router = useRouter();

  useEffect(() => {
    async function check() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/admin'); return; }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role === 'admin') {
        router.push('/'); 
      } else {
        await supabase.auth.signOut();
        router.push('/admin');
      }
    }
    check();
  }, [router]);

  return <div>Authorizing...</div>;
}