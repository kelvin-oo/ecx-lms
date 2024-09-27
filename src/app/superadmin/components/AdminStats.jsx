"use client";
import { useQuery } from "@tanstack/react-query";
import styles from "../../../styles/stats.module.scss";
import { getAdminStats } from "@/actions/superAdmin/super";

export default function AdminStats() {
  const { data, error, isLoading, isFetched } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const result = await getAdminStats();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.success;
    },
  });
  console.log("🚀 ~ AdminStats ~ data:", data);
  return (
    <section className={styles.stats}>
      <div className={styles.users}>
        <h1 className="font-varela-round md:text-lg lg:text-2xl">
          {data.totalUsers}
        </h1>
        <h2 className="font-varela-round md:text-lg lg:text-2xl"> Users</h2>
      </div>
      <div className={styles.participants}>
        <h1 className="font-varela-round md:text-lg lg:text-2xl">
          {data.totalParticipants}
        </h1>
        <h2 className="font-varela-round md:text-lg lg:text-2xl">
          {" "}
          Participants
        </h2>
      </div>
      <div className={styles.admins}>
        <h1 className="font-varela-round md:text-lg lg:text-2xl">
          {data.totalAdmins}
        </h1>
        <h2 className="font-varela-round md:text-lg lg:text-2xl">
          Admin/Tutors
        </h2>
      </div>
      <div className={styles.blocked}>
        <h1 className="font-varela-round md:text-lg lg:text-2xl">
          {data.totalBlockedUsers}
        </h1>
        <h2 className="font-varela-round md:text-lg lg:text-2xl">Blocked</h2>
      </div>
    </section>
  );
}
