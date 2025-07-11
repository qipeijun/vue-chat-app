<template>
  <div :style="styles.layout">
    <!-- 侧边栏 -->
    <ChatSidebar
      :styles="styles"
      :conversations-items="conversationsItems"
      :active-key="activeKey"
      :on-add-conversation="handleAddConversation"
      :on-conversation-click="handleConversationClick"
    />
    
    <!-- 聊天窗口 -->
    <ChatWindow
      :styles="styles"
      :messages="messages"
      :content="content"
      :agent-request-loading="agentRequestLoading"
      :on-submit="handleSubmit"
      :on-prompts-item-click="handlePromptsItemClick"
      @update:content="handleContentUpdate"
    />
  </div>
</template>

<script setup>
import { watch } from 'vue'
import ChatSidebar from './components/ChatSidebar.vue'
import ChatWindow from './components/ChatWindow.vue'
import { useTheme } from './composables/useTheme.js'
import { useChat } from './composables/useChat.js'
import { useConversations } from './composables/useConversations.js'

/**
 * 主应用组件
 * 整合所有功能模块，提供完整的聊天应用
 */

// 初始化各个功能模块
const { styles } = useTheme()
const { 
  content, 
  messages, 
  setMessages, 
  onSubmit, 
  agentRequestLoading,
  clearMessages 
} = useChat()
const { 
  conversationsItems, 
  activeKey, 
  onAddConversation, 
  onConversationClick 
} = useConversations()

/**
 * 监听会话切换，清空消息
 * 当用户切换会话时，清空当前消息列表
 */
watch(activeKey, (newKey, oldKey) => {
  if (newKey !== undefined && newKey !== oldKey) {
    try {
      clearMessages()
    } catch (error) {
      console.error('清空消息失败:', error)
    }
  }
}, { immediate: true })

/**
 * 处理添加会话
 */
function handleAddConversation() {
  try {
    onAddConversation()
  } catch (error) {
    console.error('添加会话失败:', error)
  }
}

/**
 * 处理会话切换
 * @param {string} key - 会话键值
 */
function handleConversationClick(key) {
  try {
    onConversationClick(key)
  } catch (error) {
    console.error('切换会话失败:', error)
  }
}

/**
 * 处理消息提交
 * @param {string} text - 提交的文本
 */
function handleSubmit(text) {
  try {
    onSubmit(text)
  } catch (error) {
    console.error('提交消息失败:', error)
  }
}

/**
 * 处理提示词点击
 * @param {Object} info - 提示词信息
 */
function handlePromptsItemClick(info) {
  try {
    const description = info.data?.description
    if (description) {
      onSubmit(description)
    }
  } catch (error) {
    console.error('提示词点击失败:', error)
  }
}

/**
 * 处理内容更新
 * @param {string} value - 新的内容值
 */
function handleContentUpdate(value) {
  content.value = value
}
</script>
