import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { MedCentralLogo } from "@/components/medcentral-logo";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth")({
  component: Auth,
  head: () => ({ meta: [{ title: "Sign in — MedCentral" }] }),
});

function Auth() {
  const { user, loading, signInWithGoogle, signInWithLine } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) navigate({ to: "/dashboard" });
  }, [user, loading, navigate]);

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Google sign-in failed");
    }
  };

  const handleLine = async () => {
    try {
      await signInWithLine();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "LINE sign-in failed");
    }
  };

  return (
    <div className="bg-hero-gradient flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-glow">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2.5">
          <MedCentralLogo size={40} className="rounded-xl shadow-soft" />
          <span className="text-xl font-bold">
            Med<span className="text-primary">Central</span>
          </span>
        </Link>

        <h1 className="mb-1 text-center text-2xl font-bold">{t("auth.login")}</h1>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Continue with your preferred provider
        </p>

        <div className="space-y-3">
          <Button variant="outline" className="w-full" size="lg" onClick={handleGoogle}>
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18A10.997 10.997 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.83z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
            Continue with Google
          </Button>
          <Button
            className="w-full bg-[#06C755] text-white hover:bg-[#06C755]/90"
            size="lg"
            onClick={handleLine}
          >
            Continue with LINE
          </Button>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
