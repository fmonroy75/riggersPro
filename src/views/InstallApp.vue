<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="install">
    <h1>{{ t('install.title') }}</h1>
    <p class="intro">{{ t('install.intro') }}</p>

    <div class="card">
      <h2>{{ t('install.android.title') }}</h2>
      <ol>
        <li>{{ t('install.android.step1') }}</li>
        <li>{{ t('install.android.step2') }}</li>
        <li>
          {{ t('install.android.step3', { 
            option1: t('install.android.step3_option1'), 
            option2: t('install.android.step3_option2') 
          }) }}
        </li>
        <li>{{ t('install.android.step4') }}</li>
      </ol>
    </div>

    <div class="card">
      <h2>{{ t('install.iphone.title') }}</h2>
      <ol>
        <li>{{ t('install.iphone.step1', { browser: t('install.iphone.step1_browser') }) }}</li>
        <li>{{ t('install.iphone.step2', { button: t('install.iphone.step2_button') }) }}</li>
        <li>{{ t('install.iphone.step3', { option: t('install.iphone.step3_option') }) }}</li>
        <li>{{ t('install.iphone.step4') }}</li>
      </ol>
    </div>

    <div class="card">
      <h2>{{ t('install.computer.title') }}</h2>
      <ol>
        <li>{{ t('install.computer.step1') }}</li>
        <li>{{ t('install.computer.step2', { icon: t('install.computer.step2_icon') }) }}</li>
        <li>{{ t('install.computer.step3', { button: t('install.computer.step3_button') }) }}</li>
      </ol>
    </div>

    <div class="tip">
      {{ t('install.tip') }}
    </div>
  </div>
</template>

<style scoped>

.install{

padding:30px;
max-width:700px;
margin:auto;

}

.intro{

opacity:0.8;
margin-bottom:30px;

}

.card{

background:#1e293b;
padding:20px;
border-radius:12px;
margin-bottom:20px;

}

.card h2{

margin-bottom:10px;
color:#facc15;

}

ol{

padding-left:20px;

}

.tip{

margin-top:30px;
padding:15px;
background:#020617;
border-left:4px solid #facc15;

}

</style>