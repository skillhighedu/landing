import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LockKeyhole, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useMentorLogin } from "@/features/mentor/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import CustomButton from "@/components/common/Button";

const MentorLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [form, setForm] = useState({ email: "", password: "" });
  const { mutate, isPending, error } = useMentorLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: (data) => {
        login({ role: data.additional?.role! });
        navigate("/mentor/dashboard", { replace: true });
      },
    });
  };

  return (
    <div className="min-h-screen bg-background px-4 py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <section className="hidden rounded-[32px] border border-border bg-gradient-to-br from-primary/10 via-background to-background p-10 shadow-sm lg:block">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            <ArrowLeft size={16} />
            Back to home
          </button>

          <div className="max-w-xl space-y-6">
            <div className="space-y-3">
              <p className="text-sm  uppercase tracking-[0.28em] text-primary">
                SkillHigh Mentor Portal
              </p>
              <h1 className="text-2xl  tracking-tight text-foreground">
                Review student work, track progress, and mentor from one focused workspace.
              </h1>
              <p className="text-base font-mono leading-7 text-muted-foreground">
                Sign in to access project reviews, learner performance updates, and your assigned course workflow.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 font-mono">
              <div className="rounded-3xl border border-border bg-card p-5">
                <p className="text-sm font-semibold text-foreground">Project reviews</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Open submissions quickly, leave clear feedback, and keep student progress moving.
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-5">
                <p className="text-sm font-semibold text-foreground">Performance tracking</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Update performance records and stay aligned with the learning journey for your course.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full rounded-[32px] border border-border bg-card p-8 shadow-xl sm:p-10">
          <div className="mb-8 space-y-2">
            <p className="text-sm  uppercase tracking-[0.28em] text-primary">
              Mentor Sign In
            </p>
            <h2 className="text-3xl text-card-foreground">Welcome back</h2>
            <p className="text-sm text-muted-foreground font-mono">
              Use your mentor credentials to open the dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="mentor@skillhigh.in"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="h-12 pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="h-12 pl-10"
                />
              </div>
            </div>

            {error instanceof Error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error.message || "Login failed"}
              </div>
            )}

            <CustomButton type="submit" title= {isPending ? "Signing in..." : "Open Mentor Dashboard"} disabled={isPending} className="h-12 w-full text-sm ">
             
            </CustomButton>
          </form>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground lg:hidden"
          >
            <ArrowLeft size={16} />
            Back to home
          </button>
        </section>
      </div>
    </div>
  );
};

export default MentorLogin;
