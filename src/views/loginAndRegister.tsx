import { defineComponent, ref } from 'vue'
import s from './loginAndRegister.module.scss'
import logo from '@/assets/logo.svg'
import { FormInst, FormItemRule, useMessage } from 'naive-ui'
import { http } from '@/http'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup(props, ctx) {
    const router = useRouter()
    const message = useMessage()

    // 邮箱正则
    const emailRegxp = /^\w+(-+.\w+)*@\w+(-.\w+)*.\w+(-.\w+)*$/
    // 密码正则
    const passwordRegxp = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^\da-zA-Z\s]).{8,16}$/
    // 手机号正则
    const phoneRegxp = /^[1][3,4,5,6.7,8,9][0-9]{9}$/

    const loginFormRef = ref<FormInst | null>(null)
    const loginFormValue = ref({
      email: '',
      password: ''
    })
    const loginFormRules = {
      email: {
        required: true,
        validator(rule: FormItemRule, value: string) {
          if (!value) {
            return new Error('请输入邮箱')
          } else if (!emailRegxp.test(value)) {
            return new Error('邮箱格式不正确！')
          }
          return true
        },
        trigger: ['blur']
      },
      password: {
        required: true,
        message: '请输入密码',
        trigger: ['blur']
      }
    }

    const registerFormRef = ref<FormInst | null>(null)
    const registerFormValue = ref({
      email: '',
      name: '',
      phone: '',
      password: '',
      password_confirm: ''
    })
    const registerFormRules = {
      email: {
        required: true,
        validator(rule: FormItemRule, value: string) {
          if (!value) {
            return new Error('请输入邮箱')
          } else if (!emailRegxp.test(value)) {
            return new Error('邮箱格式不正确！')
          }
          return true
        },
        trigger: ['blur']
      },
      name: {
        required: true,
        message: '请输入用户名',
        trigger: ['blur']
      },
      phone: {
        validator(rule: FormItemRule, value: string) {
          if (value && !phoneRegxp.test(value)) {
            return new Error('手机号码格式不正确！')
          }
          return true
        },
        trigger: ['blur']
      },
      password: {
        required: true,
        validator(rule: FormItemRule, value: string) {
          if (!value) {
            return new Error('请输入密码')
          } else if (!passwordRegxp.test(value)) {
            return new Error('密码格式不正确(至少包含字母、数字、特殊字符，8-16位)')
          }
          return true
        },
        trigger: ['blur']
      },
      password_confirm: {
        required: true,
        validator(rule: FormItemRule, value: string) {
          if (!value) {
            return new Error('请输入确认密码')
          } else if (!passwordRegxp.test(value)) {
            return new Error('密码格式不正确(至少包含字母、数字、特殊字符，8-16位)')
          }
          return true
        },
        trigger: ['blur']
      }
    }

    // 登录
    const login = (e) => {
      e.preventDefault()
      loginFormRef.value?.validate(async (errors) => {
        if (!errors) {
          const res = await http.post<{ token: string }>('/login', loginFormValue.value)
          message.success('登录成功！')
          localStorage.setItem('token', res.data.token)
          await navigateToHome()
        }
      })
    }

    // 注册
    const register = (e) => {
      e.preventDefault()
      registerFormRef.value?.validate(async (errors) => {
        if (!errors) {
          const res = await http.post<{ token: string }>('/register', registerFormValue.value)
          message.success('注册成功！')
          localStorage.setItem('token', res.data.token)
          await navigateToHome()
        }
      })
    }

    const navigateToHome = async () => {
      const res = await http.get<{ resource: SessionResource }>('/me')
      localStorage.setItem('user', JSON.stringify(res.data.resource))

      router.push('/')
    }

    return () => (
      <div class={s.wrapper}>
        <div class={s.image}>
          <n-image width="100" src={logo} preview-disabled />
        </div>
        <n-card>
          <n-tabs default-value="signin" size="large" animated justify-content="space-evenly">
            <n-tab-pane name="signin" tab="登录">
              <n-form ref={loginFormRef} model={loginFormValue.value} rules={loginFormRules}>
                <n-form-item-row label="邮箱" path="email">
                  <n-input v-model:value={loginFormValue.value.email} placeholder="请输入邮箱" />
                </n-form-item-row>
                <n-form-item-row label="密码" path="password">
                  <n-input
                    type="password"
                    v-model:value={loginFormValue.value.password}
                    placeholder="请输入密码"
                  />
                </n-form-item-row>
              </n-form>
              <n-button type="primary" block secondary strong onClick={login}>
                登录
              </n-button>
            </n-tab-pane>
            <n-tab-pane name="signup" tab="注册">
              <n-form
                ref={registerFormRef}
                model={registerFormValue.value}
                rules={registerFormRules}
              >
                <n-form-item-row label="邮箱" path="email">
                  <n-input v-model:value={registerFormValue.value.email} placeholder="请输入邮箱" />
                </n-form-item-row>
                <n-form-item-row label="用户名" path="name">
                  <n-input
                    v-model:value={registerFormValue.value.name}
                    placeholder="请输入用户名"
                  />
                </n-form-item-row>
                <n-form-item-row label="手机号" path="phone">
                  <n-input
                    v-model:value={registerFormValue.value.phone}
                    placeholder="请输入手机号"
                  />
                </n-form-item-row>
                <n-form-item-row label="密码" path="password">
                  <n-input
                    type="password"
                    v-model:value={registerFormValue.value.password}
                    placeholder="请输入密码"
                  />
                </n-form-item-row>
                <n-form-item-row label="确认密码" path="password_confirm">
                  <n-input
                    type="password"
                    v-model:value={registerFormValue.value.password_confirm}
                    placeholder="请输入确认密码"
                  />
                </n-form-item-row>
              </n-form>
              <n-button type="primary" block secondary strong onClick={register}>
                注册
              </n-button>
            </n-tab-pane>
          </n-tabs>
        </n-card>
      </div>
    )
  }
})
