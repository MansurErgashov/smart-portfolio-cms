<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { Modal, Form, FormItem, Checkbox, Upload, message } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import BaseInput from '@/components/BaseInput/BaseInput.vue'
import BaseTextarea from '@/components/BaseTextarea/BaseTextarea.vue'
import BaseSelect from '@/components/BaseSelect/BaseSelect.vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import { categoryOptions } from '@/pages/blog/mockData'
import type { Blog } from '@/pages/blog/mockData'
import type { Rule } from 'ant-design-vue/es/form'

const props = defineProps<{ open: boolean }>()

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void
  (e: 'created', data: Omit<Blog, 'id' | 'views' | 'createdAt'>): void
}>()

const formRef = ref()
const tagInput = ref('')
const imageUrl = ref<string | null>(null)

const formState = reactive({
  title: '',
  content: '',
  image: null as string | null,
  category: '',
  tags: [] as string[],
  published: false,
  readTime: '',
})

const rules: Record<string, Rule[]> = {
  title: [{ required: true, message: 'Sarlavhani kiriting', trigger: 'blur' }],
  category: [{ required: true, message: 'Kategoriyani tanlang', trigger: 'change' }],
  content: [{ required: true, message: 'Mazmunni kiriting', trigger: 'blur' }],
}

watch(
  () => props.open,
  (val) => {
    if (!val) {
      formRef.value?.resetFields()
      Object.assign(formState, {
        title: '',
        content: '',
        image: null,
        category: '',
        tags: [],
        published: false,
        readTime: '',
      })
      tagInput.value = ''
      imageUrl.value = null
    }
  },
)

function addTag() {
  const val = tagInput.value.trim()
  if (val && !formState.tags.includes(val)) formState.tags.push(val)
  tagInput.value = ''
}

function removeTag(tag: string) {
  formState.tags = formState.tags.filter((t) => t !== tag)
}

function beforeImageUpload(file: File) {
  if (!file.type.startsWith('image/')) {
    message.error('Faqat rasm yuklang!')
    return false
  }
  imageUrl.value = URL.createObjectURL(file)
  formState.image = imageUrl.value
  return false
}

function onSubmit() {
  formRef.value
    ?.validate()
    .then(() => {
      emit('created', { ...formState, readTime: Number(formState.readTime) || 0 })
      emit('update:open', false)
    })
    .catch(() => {})
}
</script>

<template>
  <Modal
    :open="props.open"
    title="Yangi maqola"
    :footer="null"
    width="600px"
    @cancel="emit('update:open', false)"
  >
    <Form ref="formRef" :model="formState" :rules="rules" layout="vertical" class="pt-2">
      <div class="flex flex-col gap-3 max-h-[65vh] overflow-y-auto pr-1">
        <FormItem name="title" class="!mb-0">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-medium text-slate-500"
              >Sarlavha <span class="text-red-400">*</span></label
            >
            <BaseInput v-model="formState.title" placeholder="Maqola sarlavhasi..." size="middle" />
          </div>
        </FormItem>

        <div class="grid grid-cols-2 gap-3">
          <FormItem name="category" class="!mb-0">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-slate-500"
                >Kategoriya <span class="text-red-400">*</span></label
              >
              <BaseSelect v-model="formState.category" :options="categoryOptions" size="middle" />
            </div>
          </FormItem>

          <FormItem name="readTime" class="!mb-0">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-slate-500">O'qish vaqti (daqiqa)</label>
              <BaseInput v-model="formState.readTime" type="number" placeholder="5" size="middle" />
            </div>
          </FormItem>
        </div>

        <!-- Tags -->
        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium text-slate-500">Teglar</label>
          <div class="flex gap-2">
            <BaseInput
              v-model="tagInput"
              placeholder="Vue.js"
              size="middle"
              class="flex-1"
              @keydown.enter.prevent="addTag"
            />
            <BaseButton type="default" size="middle" @click="addTag">Qo'shish</BaseButton>
          </div>
          <div v-if="formState.tags.length" class="flex flex-wrap gap-1.5 mt-1">
            <span
              v-for="tag in formState.tags"
              :key="tag"
              class="inline-flex items-center gap-1 bg-indigo-50 text-indigo-600 text-xs font-medium px-2 py-0.5 rounded-full"
            >
              {{ tag }}
              <button class="hover:text-red-400 leading-none" @click="removeTag(tag)">×</button>
            </span>
          </div>
        </div>

        <!-- Image -->
        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium text-slate-500">Muqova rasmi</label>
          <Upload :before-upload="beforeImageUpload" :show-upload-list="false" accept="image/*">
            <div
              class="w-full h-9 border border-dashed border-slate-300 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:border-indigo-400 transition-colors text-slate-400 text-sm"
            >
              <PlusOutlined />
              <span>{{ imageUrl ? 'Rasm yuklandi' : 'Rasm yuklash' }}</span>
            </div>
          </Upload>
        </div>

        <FormItem name="content" class="!mb-0">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-medium text-slate-500"
              >Mazmun <span class="text-red-400">*</span></label
            >
            <BaseTextarea v-model="formState.content" :rows="6" placeholder="Maqola mazmuni..." />
          </div>
        </FormItem>

        <Checkbox v-model:checked="formState.published">
          <span class="text-sm text-slate-600">Nashr qilish</span>
        </Checkbox>
      </div>

      <div class="flex justify-end gap-2 pt-4">
        <BaseButton type="default" size="middle" @click="emit('update:open', false)"
          >Bekor qilish</BaseButton
        >
        <BaseButton type="primary" size="middle" @click="onSubmit">Saqlash</BaseButton>
      </div>
    </Form>
  </Modal>
</template>
