import { useEffect, useState } from "react";
// import { shouldShowIntro, markIntroSeen } from "@/utils/intro";
// import SkillsCurtainIntro from "@/components/SkillsCurtainIntro";
import { Landing } from "@/features/landing";

export default function Home() {
  // const [showIntro, setShowIntro] = useState<boolean>(() =>
  //   shouldShowIntro()
  // );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const handleIntroFinish = () => {
  //   markIntroSeen();
  //   setShowIntro(false);
  // };

  return (
    <>
      {/* {showIntro && <SkillsCurtainIntro onFinish={handleIntroFinish} />} */}
      <Landing/>
    </>
  );
}
