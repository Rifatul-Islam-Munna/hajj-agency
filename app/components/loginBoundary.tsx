import { Suspense } from "react";
import Login from "../template-parts/login";

export default function LoginBoundary() {
  return (
    <Suspense fallback={<div className="section-padding text-center">Loading...</div>}>
      <Login />
    </Suspense>
  );
}
