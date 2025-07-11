<template>
  <div :style="styles.chat">
    <!-- 消息列表 -->
    <Bubble.List
      :items="items"
      :roles="roles"
      :style="styles.messages"
    />

    <!-- 提示词 -->
    <Prompts
      :items="senderPromptsItems"
      @item-click="handlePromptsItemClick"
    />

    <!-- 输入框 -->
    <Sender
      :value="content"
      :style="styles.sender"
      :loading="agentRequestLoading"
      @submit="handleSubmit"
      @change="handleContentChange"
    >
      <!-- 附件按钮 -->
      <template #prefix>
        <Badge :dot="attachedFiles.length > 0 && !headerOpen">
          <Button
            type="text"
            @click="toggleHeader"
          >
            <template #icon>
              <PaperClipOutlined />
            </template>
          </Button>
        </Badge>
      </template>

      <!-- 附件上传区域 -->
      <template #header>
        <Sender.Header
          title="Attachments"
          :open="headerOpen"
          :styles="{ content: { padding: 0 } }"
          @open-change="handleHeaderChange"
        >
          <Attachments
            :before-upload="() => false"
            :items="attachedFiles"
            @change="handleFileChange"
          >
            <template #placeholder="type">
              <Flex
                v-if="type && type.type === 'inline'"
                align="center"
                justify="center"
                vertical
                gap="2"
              >
                <Typography.Text style="font-size: 30px; line-height: 1;">
                  <CloudUploadOutlined />
                </Typography.Text>
                <Typography.Title
                  :level="5"
                  style="margin: 0; font-size: 14px; line-height: 1.5;"
                >
                  Upload files
                </Typography.Title>
                <Typography.Text type="secondary">
                  Click or drag files to this area to upload
                </Typography.Text>
              </Flex>
              <Typography.Text v-if="type && type.type === 'drop'">
                Drop file here
              </Typography.Text>
            </template>
          </Attachments>
        </Sender.Header>
      </template>
    </Sender>
  </div>
</template>

<script setup>
import { computed, ref, h } from 'vue'
import { Badge, Button, Flex, Typography } from 'ant-design-vue'
import { PaperClipOutlined, CloudUploadOutlined } from '@ant-design/icons-vue'
import { Bubble, Prompts, Sender, Attachments, Welcome } from 'ant-design-x-vue'
import { senderPromptsItems, placeholderPromptsItems } from '../utils/prompts.js'

/**
 * 聊天窗口组件
 * 包含消息列表、提示词和输入框
 */

// Props定义
const props = defineProps({
  // 样式对象
  styles: {
    type: Object,
    required: true
  },
  // 消息列表
  messages: {
    type: Array,
    default: () => []
  },
  // 输入框内容
  content: {
    type: String,
    default: ''
  },
  // 是否正在加载
  agentRequestLoading: {
    type: Boolean,
    default: false
  },
  // 提交消息的回调函数
  onSubmit: {
    type: Function,
    required: true
  },
  // 提示词点击的回调函数
  onPromptsItemClick: {
    type: Function,
    required: true
  }
})

// Emits定义
const emit = defineEmits(['update:content'])

// 本地状态
const headerOpen = ref(false)
const attachedFiles = ref([])

// 消息角色配置
const roles = {
  ai: {
    placement: 'start',
    typing: { step: 5, interval: 20 },
    styles: {
      content: {
        borderRadius: '16px',
      },
    },
  },
  local: {
    placement: 'end',
    variant: 'shadow',
  },
}

/**
 * 渲染占位符节点
 */
const placeholderNode = computed(() => h(
  'div',
  { style: props.styles.placeholder },
  [
    h(
      Welcome,
      {
        variant: "borderless",
        icon: "https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp",
        title: "Hello, I'm Ant Design X",
        description: "Base on Ant Design, AGI product interface solution, create a better intelligent vision~",
      }
    ),
    h(
      Prompts,
      {
        title: "Do you want?",
        items: placeholderPromptsItems,
        styles: {
          list: {
            width: '100%',
          },
          item: {
            flex: 1,
          },
        },
        onItemClick: props.onPromptsItemClick,
      }
    )
  ]
))

/**
 * 计算消息列表项
 */
const items = computed(() => {
  if (props.messages.length === 0) {
    return [{ content: placeholderNode, variant: 'borderless' }]
  }
  return props.messages.map(({ id, message, status }) => ({
    key: id,
    loading: status === 'loading',
    role: status === 'local' ? 'local' : 'ai',
    content: message,
  }))
})

/**
 * 处理消息提交
 * @param {string} text - 提交的文本
 */
function handleSubmit(text) {
  if (!text?.trim()) return
  
  try {
    props.onSubmit(text)
    emit('update:content', '')
  } catch (error) {
    console.error('提交消息失败:', error)
  }
}

/**
 * 处理内容变化
 * @param {string} value - 新的内容值
 */
function handleContentChange(value) {
  emit('update:content', value)
}

/**
 * 处理提示词点击
 * @param {Object} info - 提示词信息
 */
function handlePromptsItemClick(info) {
  try {
    props.onPromptsItemClick(info)
  } catch (error) {
    console.error('提示词点击失败:', error)
  }
}

/**
 * 切换附件面板
 */
function toggleHeader() {
  headerOpen.value = !headerOpen.value
}

/**
 * 处理附件面板状态变化
 * @param {boolean} open - 是否打开
 */
function handleHeaderChange(open) {
  headerOpen.value = open
}

/**
 * 处理文件变化
 * @param {Object} info - 文件信息
 */
function handleFileChange(info) {
  attachedFiles.value = info.fileList
}
</script> 