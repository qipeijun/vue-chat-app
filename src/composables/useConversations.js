import { ref, computed } from 'vue'

/**
 * 会话管理
 * 提供会话列表的状态管理和操作函数
 */
export function useConversations() {
  // 默认会话列表
  const defaultConversationsItems = [
    {
      key: '0',
      label: 'What is Ant Design X?',
    },
  ]

  // 响应式状态
  const conversationsItems = ref(defaultConversationsItems)
  const activeKey = ref(defaultConversationsItems[0].key)

  // 计算属性：当前活跃会话
  const activeConversation = computed(() => {
    return conversationsItems.value.find(item => item.key === activeKey.value)
  })

  // 计算属性：会话数量
  const conversationCount = computed(() => {
    return conversationsItems.value.length
  })

  /**
   * 添加新会话
   */
  function onAddConversation() {
    const newKey = `${conversationCount.value}`
    const newConversation = {
      key: newKey,
      label: `New Conversation ${newKey}`,
    }
    
    conversationsItems.value.push(newConversation)
    activeKey.value = newKey
    
    return newConversation
  }

  /**
   * 切换会话
   * @param {string} key - 会话键值
   */
  function onConversationClick(key) {
    if (key && key !== activeKey.value) {
      activeKey.value = key
    }
  }

  /**
   * 删除会话
   * @param {string} key - 要删除的会话键值
   */
  function removeConversation(key) {
    const index = conversationsItems.value.findIndex(item => item.key === key)
    if (index > -1) {
      conversationsItems.value.splice(index, 1)
      
      // 如果删除的是当前活跃会话，切换到第一个会话
      if (key === activeKey.value) {
        activeKey.value = conversationsItems.value[0]?.key || '0'
      }
    }
  }

  /**
   * 更新会话标题
   * @param {string} key - 会话键值
   * @param {string} newLabel - 新的标题
   */
  function updateConversationLabel(key, newLabel) {
    const conversation = conversationsItems.value.find(item => item.key === key)
    if (conversation) {
      conversation.label = newLabel
    }
  }

  return {
    // 状态
    conversationsItems,
    activeKey,
    
    // 计算属性
    activeConversation,
    conversationCount,
    
    // 方法
    onAddConversation,
    onConversationClick,
    removeConversation,
    updateConversationLabel
  }
} 