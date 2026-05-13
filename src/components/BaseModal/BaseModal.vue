<script lang="ts" setup>
import { useAttrs } from 'vue'
import { Modal } from 'ant-design-vue'
import { type ModalProps } from 'ant-design-vue/es/modal/Modal'
const model = defineModel<boolean>()
const attrs = useAttrs()
const emit = defineEmits<{ (e: 'close'): void }>()
const { closable = true, mask = true, maskClosable = true } = defineProps<ModalProps>()
const handleClose = () => {
  emit('close')
}
</script>
<template>
  <div>
    <Modal
      v-bind="attrs"
      :afterClose
      :bodyStyle
      :cancelButtonProps
      :cancelText
      :centered="true"
      :closable
      :closeIcon
      :confirmLoading
      :destroyOnClose
      :footer="false"
      :forceRender
      :getContainer
      :mask
      :maskClosable
      :maskStyle
      :okButtonProps
      :okText
      :okType
      :title
      :width
      :wrapClassName
      :zIndex
      v-model:open="model"
      @close="handleClose"
    >
      <slot></slot>
    </Modal>
  </div>
</template>
<style scoped></style>
