/* 统一社会信用代码 */
export function validateSocialCode(rule, value, callback) {
  const reg = /^[A-Za-z0-9]{18}$/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入18位有效的统一社会信用代码'))
    } else {
      callback()
    }
  }
}

/* 身份证号校验 */
export function validateIdCard(rule, value, callback) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入正确的身份证号码'))
    } else {
      callback()
    }
  }
}

/* 手机号码校验 */
export function validatePhone(rule, value, callback) {
  const reg = /^1[3-9]\d{9}$/
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入正确的手机号码'))
    } else {
      callback()
    }
  }
}

export function validateLoginPwd(rule, value, callback) {
  const reg = new RegExp('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,30}')
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('密码需包含大写字母小写字母特殊字符数字,长度8-30位,列如Yhh@2918'))
    } else {
      callback()
    }
  }
}

export function validateLoginLuRu(rule, value, callback) {
  const reg = new RegExp('^[0-9]+(\.[0-9]{1,30})?$')
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value))) {
      callback(new Error('只能录入正数'))
    } else {
      callback()
    }
  }
}

/* 邮箱地址校验 */
export function validateEmail(rule, value, callback) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入正确的邮箱地址'))
    } else {
      callback()
    }
  }
}

/* 中、英文、数字组合 */
export function validateZhEnNum(rule, value, callback) {
  const reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入有效的内容（中文、英文、数字组成）'))
    } else {
      callback()
    }
  }
}

/* 英文、数字组合 */
export function validateEnNum(rule, value, callback) {
  const reg = /^[a-zA-Z0-9]+$/
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入有效的内容（英文、数字组成）'))
    } else {
      callback()
    }
  }
}
