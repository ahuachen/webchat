<template>
  <div>
    <div
      ref="header"
      class="od-header"
      @click="onClose"
      
      :class="{'od-header--open': isOpen, 'od-header--closed': !isOpen}"
    >
      <div
        ref="headerCta"
        class="od-header-cta"
        
      >
        <div class="od-header-cta__icon"></div>

        <div v-if="ctaText.length" class="od-header-cta__text" ref="headerCtaText">
          <span v-for="text in ctaText">{{ text }}</span>
        </div>
      </div>

      <div class="od-header-nav">
        <div class="od-header-nav__team-name" v-if="!showFullPageFormInput && !showFullPageRichInput">
          <span v-if="teamName" v-html="teamName"></span>
        </div>

        <div class="od-header-nav__logo">
          <img v-if="imageUrl" :src="imageUrl" alt />
        </div>

        <div
          v-if="showRestartButton"
          @click.stop="onRestartButtonClick"
          class="od-header-nav__restart-button"
        >
          <img src="../assets/restart.svg" />
          <span>Restart</span>
        </div>

        <div v-else class="od-header-nav__restart-button"></div>

        <div
          v-if="!showFullPageFormInput && !showFullPageRichInput"
          class="od-header-nav__download-button" @click.stop="onDownload"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="19" viewBox="0 0 12 19">
            <path fill="#FFF" fill-rule="evenodd" d="M6 14.481l-4.95-4.95 1.414-1.414 2.537 2.537L5 .34h2v10.314l2.536-2.536 1.414 1.414L6 14.481zm6 3.858H0v-2h12v2z"/>
          </svg>
        </div>
      </div>

      <div class="od-header__btm-fade"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      referrerUrl: '',
    };
  },
  watch: {
    ctaText(newVal, oldVal) {
      if (this.ctaText.length) {
        window.parent.postMessage({ width: "auto" }, this.referrerUrl);
        setTimeout(() => {
          this.$refs.headerCta.classList.add("header-cta-expand");
        }, 1000);
      } else {
        this.$refs.headerCta.classList.remove("header-cta-expand");
        if (newVal.length !== oldVal.length && !this.isOpen) {
          window.parent.postMessage({ width: "130px" }, this.referrerUrl);
        }
      }
    },
  },
  props: {
    ctaText: {
      type: Array,
      default: () => []
    },
    imageUrl: {
      type: String
    },
    teamName: {
      type: String
    },
    onClose: {
      type: Function,
      required: true
    },
    onExpand: {
      type: Function,
      required: true
    },
    onRestartButtonClick: {
      type: Function,
      required: true
    },
    onDownload: {
      type: Function,
      required: true
    },
    showRestartButton: {
      type: Boolean,
      default: () => false
    },
    showExpandButton: {
      type: Boolean,
      default: true
    },
    isOpen: {
      type: Boolean,
      default: () => false
    },
    showFullPageFormInput: {
      type: Boolean,
      default: true
    },
    showFullPageRichInput: {
      type: Boolean,
      default: true
    },
  },
  created() {
    if (window.self !== window.top) {
      this.referrerUrl = document.referrer.match(/^.+:\/\/[^\/]+/)[0];
    } else {
      this.referrerUrl = document.location.origin;
    }
  },
};
</script>

<style lang="scss">
  @import '../../../sass/0-globals/_vars.scss';

  .od-header {
    background-color: var(--od-header-background);
    color: var(--od-header-text);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    position: relative;
    display: flex;
    justify-content: flex-start;
    height: 82px;

    @media (min-width: $media-sml) {
      border-radius: 0;
      box-shadow: none;
    }

    .od-header-cta {
      background-color: var(--od-header-background);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      white-space: nowrap;
      height: 90px;
      width: 90px;
      border-radius: 45px;
      transition: width 0.45s;
      margin: 0 10px 0 0;
      box-shadow: 0 3px 10px 3px rgba(0, 0, 0, 0.3);
    }

    .od-header-cta-expand {
      width: 285px;
      height: 70px;
      margin: 0 auto;
      justify-content: flex-start;
      padding: 0 35px;

      @media (min-width: 450px) {
        width: 370px;
        padding: 0 35px;
        height: 90px;
      }

      .od-header-cta__text {
        display: block;
      }
    }

    .od-header-cta__icon {
      min-height: 50px;
      min-width: 50px;
      background: url(/vendor/webchat/images/header-cta-btn.svg);
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }

    .od-header-cta__text {
      margin-left: 20px;
      display: none;
      overflow: hidden;
      white-space: nowrap;

      span {
        font-size: 20px;
        display: block;
        font-weight: 500;
        line-height: 1.5;
        color: var(--od-header-text);
      }
    }

    .od-header-nav__download-button {
      background-color: var(--od-button-background);
      color: var(--od-button-text);
      position: absolute;
      right: 18px;
      top: 13px;
      width: 40px;
      height: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 14px;

      svg > * {
        fill: var(--od-button-text);
      }

      &:hover {
        background-color: var(--od-button-hover-background);

        svg > * {
          fill: var(--od-button-text);
        }
      }
    }

    .mobile & {
      .od-header-nav__download-button {
        right: 11px;
        top: 11px;
      }
    }

    .od-header__btm-fade {
      background: rgb(27, 33, 42);
      background: var(--od-header-background-gradient);
      position: absolute;
      bottom: -25px;
      height: 25px;
      width: 100%;
      z-index: 999;
    }

    .od-header-nav {
      max-width: 1000px;
      width: 100%;
      display: flex;
      flex-direction: column-reverse;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      @media (min-width: $media-med) {
        flex-direction: row;
        width: calc(100% - 50px);
        justify-content: space-between;
        margin: 10px auto;
      }
    }

    .od-header-nav__team-name {
      width: 100%;
      align-items: center;
      justify-content: center;
      display: flex;
      font-size: 14px;

      @media (min-width: $media-med) {
        display: flex;
        width: 28%;
      }
    }

    .od-header-nav__logo {
      width: 40%;
      min-height: 22px;
      margin-bottom: 10px;

      @media (min-width: $media-sml) {
        width: 28%;
      }

      img {
        object-fit: contain;
      }
    }

    .od-header-nav__restart-button {
      width: 28%;
      margin: 0 !important;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      img {
        vertical-align: middle;
      }

      span {
        vertical-align: middle;
      }
    }

    &--closed {
      height: 110px;
      margin: 10px 0;
      background: none !important;

      .od-header-nav {
        display: none;
      }
    }

    &--open {
      .od-header-cta {
          display: none;
      }
    }

  }
</style>
