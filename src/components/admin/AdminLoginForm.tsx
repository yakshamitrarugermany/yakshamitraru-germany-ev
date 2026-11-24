"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const GENERIC_AUTH_ERROR = "Invalid email or password";

export function AdminLoginForm() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setAuthError(null);

    try {
      const result = await authClient.signIn.email({
        email: values.email.trim(),
        password: values.password,
      });

      if (result.error) {
        setAuthError(GENERIC_AUTH_ERROR);
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setAuthError(GENERIC_AUTH_ERROR);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div>
        <label
          htmlFor="admin-email"
          className="eyebrow text-ink-soft block mb-1.5"
        >
          Email
        </label>
        <input
          id="admin-email"
          type="email"
          autoComplete="email"
          placeholder="admin@yakshamitraru.de"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "admin-email-error" : undefined}
          className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-forest-deep focus:outline-none transition-colors"
          {...register("email")}
        />
        {errors.email && (
          <p id="admin-email-error" className="mt-1.5 text-xs text-crimson">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="admin-password"
          className="eyebrow text-ink-soft block mb-1.5"
        >
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••••••"
          aria-invalid={errors.password ? true : undefined}
          aria-describedby={
            errors.password ? "admin-password-error" : undefined
          }
          className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-forest-deep focus:outline-none transition-colors"
          {...register("password")}
        />
        {errors.password && (
          <p id="admin-password-error" className="mt-1.5 text-xs text-crimson">
            {errors.password.message}
          </p>
        )}
      </div>

      {authError && (
        <div
          role="alert"
          className="rounded-md border border-crimson/30 bg-crimson/5 px-3.5 py-2.5 text-sm text-crimson"
        >
          {authError}
        </div>
      )}

      <Button
        type="submit"
        variant="forest"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing in…
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
}
