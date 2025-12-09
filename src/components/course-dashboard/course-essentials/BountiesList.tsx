import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Link2, DollarSign } from "lucide-react";
import { useParams } from "react-router-dom";
import CustomButton from "@/components/common/Button";;
import BackButton from "@/components/common/BackButton";;
import { courseBountiesData, type Bounty } from "@/data/courseBounties";

export default function BountiesList() {
  const { courseId } = useParams<{ courseId: string }>();
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const loadedBounties = courseBountiesData[courseId || "default"] || courseBountiesData.default;
    setBounties(loadedBounties);
    setIsLoading(false);
  }, [courseId]);

  const handleBountyApplication = (bountyId: string) => {
    // TODO: Implement bounty application
    console.log("Apply to bounty:", bountyId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 p-6 md:p-10 text-white font-pixel">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-8">
        <BackButton className="mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold text-[#16C47F] pixel-shadow text-center">
          Skill-Based Bounties
        </h1>
        <p className="text-base text-gray-300 font-bricolage text-center mt-3">
          {bounties.length} {bounties.length === 1 ? 'Bounty' : 'Bounties'} • Earn Rewards for Your Skills
        </p>
      </div>

      {/* Bounties Grid */}
      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-80 w-full bg-[#1a1a1a] rounded-2xl animate-pulse border-2 border-black"
            />
          ))
        ) : bounties && bounties.length > 0 ? (
          bounties.map((bounty, index) => (
            <motion.div
              key={bounty.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#1a1a1a] shadow-2xl rounded-2xl overflow-hidden border-2 border-black hover:border-[#16C47F]/50 transition-all duration-300 flex flex-col"
            >
              {/* Card Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Bounty Number and Title */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 rounded-md bg-[#16C47F]/20 flex items-center justify-center border-2 border-[#16C47F] flex-shrink-0 shadow-[2px_2px_0_#000]">
                    <span className="text-[#16C47F] font-bold text-sm pixel-shadow">B{index + 1}</span>
                  </div>
                  
                  {/* Title - Fixed Height */}
                  <h2 className="text-xl font-bold text-[#16C47F] pixel-shadow line-clamp-2 min-h-[3.5rem] flex-1 leading-snug">
                    {bounty.name}
                  </h2>
                </div>

                {/* Description - Fixed Height */}
                <p className="text-base text-gray-300 font-bricolage leading-relaxed line-clamp-3 mb-6 flex-1">
                  {bounty.description}
                </p>

                {/* Bounty Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm font-bricolage">
                    <div className="flex items-center gap-2 text-gray-300">
                      <CalendarDays className="w-4 h-4" />
                      <span>Due: {new Date(bounty.expiryDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-[#16C47F] pixel-shadow">₹ {bounty.amount}</span>
                    <span className="text-base text-gray-300 font-bricolage">
                      {bounty.slots} Slots
                    </span>
                  </div>

                  {/* View Link */}
                  {bounty.link && (
                    <a
                      href={bounty.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-base text-blue-400 hover:text-blue-300 transition-colors font-bold group/link"
                    >
                      <Link2 className="w-5 h-5" />
                      <span>View Details</span>
                    </a>
                  )}
                </div>

                {/* Action Button - Always at bottom */}
                <CustomButton
                  title={bounty.isSlotsAvailable ? "Apply Now" : "Slots Filled"}
                  onClick={() => handleBountyApplication(bounty.id)}
                  disabled={!bounty.isSlotsAvailable || isLoading}
                  className={`w-full flex items-center justify-center gap-2 font-bold text-sm py-3 ${
                    bounty.isSlotsAvailable
                      ? "bg-[#16C47F] hover:bg-[#14b371] text-black"
                      : "bg-gray-600 cursor-not-allowed text-gray-400"
                  }`}
                >
                  {bounty.isSlotsAvailable ? "Apply Now" : "Slots Filled"}
                </CustomButton>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1a1a1a] mb-4 border-2 border-[#16C47F]">
              <DollarSign className="w-8 h-8 text-[#16C47F]" />
            </div>
            <p className="text-base text-gray-300 font-bricolage">
              No bounties available yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
