<script setup>

import { ref } from "vue"

const result = ref(null)

function saveResult(){

console.log("saved")

}

</script>

<template>

<div class="calculator">

<slot/>

<div v-if="result" class="result">

Result: {{ result }}

</div>

<button class="calculate">

CALCULATE

</button>

<button class="save" @click="saveResult">

SAVE RESULT

</button>

</div>

</template>

<style scoped>

.calculator{
padding:20px;
}

.result{
background:#111827;
padding:20px;
margin:20px 0;
font-size:22px;
text-align:center;
}

.calculate{
background:#facc15;
border:none;
padding:12px;
width:100%;
margin-bottom:10px;
}

.save{
background:#1e293b;
color:white;
border:none;
padding:10px;
width:100%;
}

</style>