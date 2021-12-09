<template>
  <div>
    <div class="header" id="head">
      <div class="title">零信任政务云安全管理试点应用平台</div>
    </div>
    <div :class="classObj" class="app-wrapper">
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
      <sidebar class="sidebar-container" />
      <div :class="{hasTagsView:needTagsView}" class="main-container">
        <div :class="{'fixed-header':fixedHeader}">
          <navbar />
          <tags-view v-if="needTagsView" />
        </div>
        <app-main />
        <right-panel v-if="showSettings">
          <settings />
        </right-panel>
      </div>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }

  * {
    margin: 0;
    padding: 0;
  }

  #head {
    height: 120px;
    width: 100;
    background-color: #66CCCC;
    text-align: center;
    position: relative;
  }

  #foot {
    width: 100;
    height: 126px;
    background-color: #CC9933;
    position: relative;
  }

  .title {
    font-family: "宋体";
    color: #FFFFFF;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* 使用css3的transform来实现 */
    font-size: 36px;
    height: 40px;
    width: 30%;
    white-space: nowrap;
  }

  .copyright {
    font-family: "宋体";
    color: #FFFFFF;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* 使用css3的transform来实现 */
    height: 60px;
    width: 40%;
    text-align: center;
  }


  #foot .copyright .img {
    width: 100%;
    height: 24px;
    position: relative;
  }

  .copyright .img .icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-left: 22px;
    vertical-align: middle;
    background-image: url(%E7%94%B5%E5%AD%90%E9%82%AE%E4%BB%B6.png);
    background-repeat: no-repeat;
    vertical-align: middle;
    margin-right: 5px;
  }

  .copyright .img .icon1 {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-left: 22px;
    vertical-align: middle;
    background-image: url(%E5%9C%B0%E5%9D%80.png);
    background-repeat: no-repeat;
    vertical-align: middle;
    margin-right: 5px;
  }

  .copyright .img .icon2 {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-left: 22px;
    vertical-align: middle;
    background-image: url(%E8%81%94%E7%B3%BB%E6%96%B9%E5%BC%8F.png);
    background-repeat: no-repeat;
    vertical-align: middle;
    margin-right: 5px;
  }

  #foot .copyright p {
    height: 24px;
    width: 100%;
  }

  #layer {
    display: none;
    position: absolute;
  }
</style>
