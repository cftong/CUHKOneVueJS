<template>
  <simple-header title="About"></simple-header>
  <content>
    <div class="content-padded">
      <p>免責聲明:本網站內容由相關網頁即時擷取。開發人員無須事先通知而可隨時修改本網頁的任何部分。因使用、誤用或依據此網頁的資訊而導致的損失或破壞，開發人員概不負責。</p>
      <p>Disclaimer:The contents of the website of CUOne is captured from the related websites. Developer is subject to change without notice. The developer accepts no liability for any loss or damage howsoever arising from any use or misuse of or reliance on any information in this website.</p>
      <p>Developed by Chris Tong</p>
      <p><a href="https://blogcftong.azurewebsites.net">My Blog</a></p>
      <p>The UI is based on VUM which is an UI Framework for build mobile web app with vue.js by 言川</p>
      <p>Source Code of the framework: <a href="https://github.com/lihongxun945/vum" target="_blank">https://github.com/lihongxun945/vum</a></p>
    </div>
  </content>
</template>

<script>
import Content from '../components/content'
import { SimpleHeader } from '../components/header'

export default {
  components: {
    SimpleHeader,
    Content
  }
}
</script>
