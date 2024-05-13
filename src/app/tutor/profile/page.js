"use client";
import FormBox from "@/components/profile/FormBox";
import FormBoxHeader from "@/components/profile/FormBoxHeader";
import FormImageInput from "@/components/profile/FormImageInput";
import React, { useState } from "react";
import styles from "../adminProfilePage.module.scss";
import Image from "next/image";
import FormInput from "@/components/profile/FormInput";

const AdminProfilePage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className="relative w-20 h-20 lg:w-[8.3125rem] lg:h-[8.3125rem] bg-ecx-colors-black rounded-full">
          <Image src="" alt="" className="object-cover object-center" />
        </div>
        <a href="">Edit Profile</a>
      </div>
      <form className="grid grid-cols-1 gap-y-10 pb-8">
        {/* personal information */}

        <div className="information">
          <FormBox>
            <FormBoxHeader header={`Personal Information`} />
            <div className="grid grid-cols-1 gap-y-4">
              <FormInput placeholder="Name" type="name" />
              <FormInput placeholder="Email" type="email" />
              <FormInput placeholder="Role" type="text" />
            </div>
          </FormBox>
        </div>

        {/* Tutor-Specific Details */}
        <div className={styles.details}>
          <FormBoxHeader header={`Tutor-Specific Details`} />
          <div className={styles.detailsBox}>
            <h3>Your Assigned Track</h3>
            <h3> Front end Web dev</h3>
          </div>
          <div className={styles.detailsBox}>
            <p>Number of Participants in Your Track</p>
            <p> 140</p>
          </div>
          <div className={styles.detailsBox}>
            <p>Tasks Graded Today</p>
            <p> 140</p>
          </div>
          <div className={styles.detailsBox}>
            <p>Pending Tasks to Grade</p>
            <p> 140</p>
          </div>
        </div>

        {/* Participant Performance */}

        <div className={styles.performance}>
          <FormBoxHeader header={`Participant Performance`} />
          <div className={styles.performanceBox}>
            <div className={styles.left}>
              <h3>Highest Scorer:</h3>
              <h3>Score</h3>
            </div>
            <div className={styles.right}>
              <h3>Azeem</h3>
              <h3>140</h3>
            </div>
          </div>
          <div className={styles.performanceBox}>
            <div className={styles.left}>
              <h3>Most Active Participant</h3>
              <h3>Tasks Completed</h3>
            </div>
            <div className={styles.right}>
              <h3>Azeem</h3>
              <h3>140</h3>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default AdminProfilePage;
