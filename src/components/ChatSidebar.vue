<template>
    <div :style="styles.menu">
        <!-- Logo区域 -->
        <div :style="styles.logo">
            <img
                src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*eco6RrQhxbMAAAAAAAAAAAAADgCCAQ/original"
                draggable="false"
                alt="logo"
                :style="styles['logo-img']"
            >
            <span :style="styles['logo-span']">Ant Design X Vue</span>
        </div>

        <!-- 添加会话按钮 -->
        <Button
            type="link"
            :style="styles.addBtn"
            @click="handleAddConversation"
        >
            <PlusOutlined />
            New Conversation
        </Button>

        <!-- 会话列表 -->
        <Conversations
            :items="conversationsItems"
            :style="styles.conversations"
            :active-key="activeKey"
            @active-change="handleConversationClick"
        />
    </div>
</template>

<script setup>
import { Button } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { Conversations } from 'ant-design-x-vue'

/**
 * 聊天侧边栏组件
 * 包含Logo、添加会话按钮和会话列表
 */

// Props定义
const props = defineProps({
    // 样式对象
    styles: {
        type: Object,
        required: true
    },
    // 会话列表
    conversationsItems: {
        type: Array,
        default: () => []
    },
    // 当前活跃的会话键值
    activeKey: {
        type: String,
        required: true
    },
    // 添加会话的回调函数
    onAddConversation: {
        type: Function,
        required: true
    },
    // 会话切换的回调函数
    onConversationClick: {
        type: Function,
        required: true
    }
})

// Emits定义
const emit = defineEmits(['add-conversation', 'conversation-click'])

/**
 * 处理添加会话
 */
function handleAddConversation() {
    try {
        props.onAddConversation()
        emit('add-conversation')
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
        props.onConversationClick(key)
        emit('conversation-click', key)
    } catch (error) {
        console.error('切换会话失败:', error)
    }
}
</script>
