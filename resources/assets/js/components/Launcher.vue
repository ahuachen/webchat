<template>
  <div class="od-chat-window-container">
    <ChatWindow
      :messageList="messageList"
      :onUserInputSubmit="onMessageWasSent"
      :onFullPageFormInputSubmit="onFullPageFormInputSubmit"
      :onFullPageFormInputCancel="onFullPageFormInputCancel"
      :onFullPageRichInputSubmit="onFullPageRichInputSubmit"
      :agentProfile="agentProfile"
      :isOpen="isOpen"
      :isExpand="isExpand"
      :onClose="close"
      :onExpand="expand"
      :onButtonClick="onButtonClick"
      :onFormButtonClick="onFormButtonClick"
      :onListButtonClick="onListButtonClick"
      :onRestartButtonClick="onRestartButtonClick"
      :onDownload="onDownload"
      :onLinkClick="onLinkClick"
      :contentEditable="contentEditable"
      :showExpandButton="showExpandButton"
      :placeholder="placeholder"
      :showRestartButton="showRestartButton"
      :showTypingIndicator="showTypingIndicator"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :showLongTextInput="showLongTextInput"
      :showFullPageFormInput="showFullPageFormInput"
      :showFullPageRichInput="showFullPageRichInput"
      :showMessages="showMessages"
      :maxInputCharacters="maxInputCharacters"
      :headerText="headerText"
      :buttonText="buttonText"
      :confirmationMessage="confirmationMessage"
      :initialText="initialText"
      :fullScreen="fullScreen"
      :fpFormInputMessage="fpFormInputMessage"
      :fpRichInputMessage="fpRichInputMessage"
      :ctaText="ctaText"
      :mode-data="modeData"
      @setChatMode="setChatMode"
      :hideMessageTime="hideMessageTime"
    />
  </div>
</template>
<script>
import ChatWindow from './ChatWindow.vue'
import SessionStorageMixin from "../mixins/SessionStorageMixin";

export default {
  props: {
    contentEditable: {
      type: Boolean,
      default: true
    },
    fullScreen: {
      type: Boolean,
      default: false
    },
    isOpen: {
      type: Boolean,
      required: true
    },
    isExpand: {
      type: Boolean,
      required: true
    },
    close: {
      type: Function,
      required: true
    },
    expand: {
      type: Function,
      required: true
    },
    showExpandButton: {
      type: Boolean,
      default: true
    },
    hideMessageTime: {
      type: Boolean,
      default: false
    },
    agentProfile: {
      type: Object,
      required: true
    },
    onMessageWasSent: {
      type: Function,
      required: true
    },
    onFullPageFormInputSubmit: {
      type: Function,
      required: true
    },
    onFullPageFormInputCancel: {
        type: Function,
        required: true
    },
    onFullPageRichInputSubmit: {
      type: Function,
      required: true
    },
    ctaText: {
      type: Array,
      default: () => []
    },
    messageList: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: 'Enter your message'
    },
    showRestartButton: {
      type: Boolean,
      default: () => false
    },
    showTypingIndicator: {
      type: Boolean,
      default: () => true
    },
    showLongTextInput: {
      type: Boolean,
      default: () => false
    },
    showFullPageFormInput: {
      type: Boolean,
      default: () => false
    },
    showFullPageRichInput: {
      type: Boolean,
      default: () => false
    },
    showMessages: {
      type: Boolean,
      default: () => true
    },
    fpFormInputMessage: {
      type: Object,
      default: () => {}
    },
    fpRichInputMessage: {
      type: Object,
      default: () => {}
    },
    maxInputCharacters: {
      type: Number,
      default: 0
    },
    headerText: {
      type: String,
      default: ''
    },
    buttonText: {
      type: String,
      default: 'Submit'
    },
    confirmationMessage: {
      type: String,
      default: 'Are you sure you want to submit?'
    },
    onButtonClick: {
      type: Function,
      required: true
    },
    onFormButtonClick: {
      type: Function,
      required: true
    },
    onListButtonClick: {
      type: Function,
      required: true
    },
    onLinkClick: {
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
    initialText: {
       type: String,
       default: null
    },
    alwaysScrollToBottom: {
      type: Boolean,
      default: () => false
    },
    modeData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
  components: {
    ChatWindow
  },
  mixins: [SessionStorageMixin],
  created() {
    if (this.isCustomModeInSession()) {
      this.setChatMode(this.getModeDataInSession());
    }
  },
  methods: {
    setChatMode(mode) {
      this.$emit('setChatMode', mode);
    }
  }
}
</script>

<style lang="scss">
.od-chat-window-container {
  display: inline;
}
</style>
