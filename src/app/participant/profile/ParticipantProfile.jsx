"use client";
import FormBox from "@/components/profile/FormBox";
import FormBoxHeader from "@/components/profile/FormBoxHeader";
import FormImageInput from "@/components/profile/FormImageInput";
import React, { useState } from "react";
import styles from "../../../styles/adminProfilePage.module.scss";
import { getParticipantProfile } from "@/actions/participants/participant"
import Image from "next/image";
import FormInput from "@/components/profile/FormInput";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

const ParticipantProfile = ( { id } ) => {
  const { data:user, error, isLoading, isFetched } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const result = await getParticipantProfile(id)
      if (result.error) {
        throw new Error(result.error);
      }
      return result.success
    },
    // refetchOnMount: true
  }); 
  // const user = useCurrentClientUser()
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className="relative w-20 h-20 lg:w-[8.3125rem] lg:h-[8.3125rem] bg-ecx-colors-black rounded-full">
          <Image src={user?.image} alt="" className="w-[100%] h-[100%] rounded-full object-fill bg-cover"  width={200} height={200}/>
        </div>
        <Link href="/participant/profile/edit">Edit Profile</Link>
      </div>
      <form className="grid grid-cols-1 gap-y-10 pb-8">
        {/* personal information */}

        <div className="information">
          <FormBox>
            <FormBoxHeader header={`Personal Information`} />
            <div className="grid grid-cols-1 gap-y-4">
              <FormInput placeholder={`Name -- ${user.firstName} ${user.lastName}`} type="name" disabled={true}/>
              <FormInput placeholder={`Email -- ${user.email}`}type="email" disabled={true}/>
              <FormInput placeholder={`Role -- ${user.role}`} type="text" disabled={true}/>
              <FormInput placeholder={`Your Track -- ${user.track}`} type="text" disabled={true}/>
            </div>
          </FormBox>
        </div>

        {/* Tutor-Specific Details */}
        {/* <FormBox>
        <FormBoxHeader header={`Educational`} />
        <div className="grid grid-cols-1 gap-y-4">
          <input
            type="text"
            placeholder={`Track --- ${user?.track}`}
            name="track"
            disabled={true}
            className=" border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate"
          />
          <div className="grid gap-y-4 lg:grid-cols-2 lg:gap-x-8">
            <input
              type="text"
              placeholder="Department"
              name="Department"
              disabled={true}
             
              className=" border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate"
            />
            <input
              type="text"
              placeholder="Faculty"
              name="Faculty"
             
              disabled={true}
              className=" border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate"
            />
          </div>
        </div>
      </FormBox> */}

        {/* Participant Performance */}

        {/* <div className={styles.performance}>
          <FormBoxHeader header={`Participant Performance`} />
          <div className={styles.performanceBox}>
            <div className={styles.left}>
              <h3>Highest Scorer:</h3>
              <h3>Score</h3>
            </div>
            <div className={styles.right}>
              <h3>{highestScoreParticipant.success.firstName}</h3>
              <h3>{highestScoreParticipant.success.points}</h3>
            </div>
          </div>
          <div className={styles.performanceBox}>
            <div className={styles.left}>
              <h3>Most Active Participant</h3>
              <h3>Tasks Completed</h3>
            </div>
            <div className={styles.right}>
              <h3>{highestTaskParticipant.success.firstName}</h3>
              <h3>{highestTaskParticipant.success.taskCompleted}</h3>
            </div>
          </div>
        </div> */}
      </form>
    </main>
  );
};

export default ParticipantProfile;
