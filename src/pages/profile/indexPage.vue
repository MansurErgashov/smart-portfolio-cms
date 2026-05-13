<script setup lang="ts">
import { ref, computed } from 'vue'
import { message } from 'ant-design-vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import { profileMock } from './mockData'
import AvatarCard from './components/AvatarCard.vue'
import BasicInfoCard from './components/BasicInfoCard.vue'
import BioCard from './components/BioCard.vue'
import SocialLinksCard from './components/SocialLinksCard.vue'

const triggerSave = ref(0)
const submitCount = ref(0)

const basicInfo = ref({
  fullName: profileMock.fullName,
  username: profileMock.username,
  email: profileMock.email,
  phone: profileMock.phone,
  address: profileMock.address,
  birthDate: profileMock.birthDate,
  experienceYears: profileMock.experienceYears,
  profession: profileMock.profession,
  languages: profileMock.languages,
})

const bioInfo = ref({
  aboutShort: profileMock.aboutShort,
  aboutLong: profileMock.aboutLong,
})

const socialInfo = ref({
  github: profileMock.github,
  linkedin: profileMock.linkedin,
  telegram: profileMock.telegram,
  resume: profileMock.resume,
})

const displayData = computed(() => ({
  fullName: basicInfo.value.fullName,
  profession: basicInfo.value.profession,
  address: basicInfo.value.address,
  github: socialInfo.value.github,
  linkedin: socialInfo.value.linkedin,
}))

function onSave() {
  submitCount.value = 0
  triggerSave.value++
}

function onBasicSubmit(data: Record<string, unknown>) {
  // basicInfo.value = data
  checkAllSubmitted()
}

function onBioSubmit(data: Record<string, unknown>) {
  // bioInfo.value = data
  checkAllSubmitted()
}

function onSocialSubmit(data: Record<string, unknown>) {
  // socialInfo.value = data
  checkAllSubmitted()
}

function checkAllSubmitted() {
  submitCount.value++
  if (submitCount.value === 3) {
    message.success('Profil muvaffaqiyatli saqlandi!')
    submitCount.value = 0
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold text-slate-800">Profil</h1>
      <BaseButton type="primary" size="middle" @click="onSave">Saqlash</BaseButton>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Left -->
      <div class="lg:col-span-1">
        <AvatarCard
          :full-name="displayData.fullName"
          :profession="displayData.profession"
          :address="displayData.address"
          :github="displayData.github"
          :linkedin="displayData.linkedin"
        />
      </div>

      <!-- Right -->
      <div class="lg:col-span-2 flex flex-col gap-4">
        <BasicInfoCard :trigger-save="triggerSave" @submit="onBasicSubmit" />
        <BioCard :trigger-save="triggerSave" @submit="onBioSubmit" />
        <SocialLinksCard :trigger-save="triggerSave" @submit="onSocialSubmit" />
      </div>
    </div>
  </div>
</template>
