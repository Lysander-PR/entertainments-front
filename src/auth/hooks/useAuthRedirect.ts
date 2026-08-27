import { useNavigate, useSearchParams } from "react-router";

import { resolveHandoffRedirect } from "@/shared/utils/form-handoff.util";

const REDIRECT_PARAM = "redirect";

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return () => {
    const handoffUrl = resolveHandoffRedirect(searchParams.get(REDIRECT_PARAM));

    if (handoffUrl) {
      window.location.replace(handoffUrl);
      return;
    }

    navigate("/");
  };
};
