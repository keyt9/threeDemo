import { defineConfig } from 'eslint/config'
import globals from 'globals'
// import vueParser from 'vue-eslint-parser'
import vuePlugin from 'eslint-plugin-vue'
import pluginVue from 'eslint-plugin-vue'
import js from '@eslint/js'

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,vue}'] },
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } }
  },
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    plugins: { vue: vuePlugin, js },
    extends: ['js/recommended']
  },
  js.configs.recommended,
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-env']
        }
      }
    }
  },
  {
    rules: {
      'vue/html-comment-content-spacing': [
        'error',
        'always',
        {
          exceptions: []
        }
      ],
      // 'array-bracket-spacing': ['error', 'always'],
      // 'object-curly-spacing': ['error', 'always'],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'never',
            normal: 'always',
            component: 'always'
          },
          svg: 'always',
          math: 'always'
        }
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 6
          },
          multiline: {
            max: 6
          }
        }
      ],
      'vue/html-closing-bracket-spacing': [
        'error',
        {
          selfClosingTag: 'always'
        }
      ],
      // 'vue/multi-word-component-names': ['error', 'never'],
      'vue/multi-word-component-names': 'off',
      'vue/no-template-shadow': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'error',
      // 'vue/multiline-html-element-content-newline': ['error', 'always'],
      // 'vue/name-property-casing': ['error', 'CamelCase'], // PascalCase 大驼峰 CamelCase 小驼峰
      'vue/no-v-html': 'off',
      'accessor-pairs': 2,
      'arrow-spacing': [
        2,
        {
          before: true,
          after: true
        }
      ],
      'block-spacing': [2, 'always'],
      'brace-style': [
        2,
        '1tbs',
        {
          allowSingleLine: true
        }
      ],
      camelcase: [
        0,
        {
          properties: 'always'
        }
      ],
      'comma-dangle': [2, 'never'],
      'comma-spacing': [
        2,
        {
          before: false,
          after: true
        }
      ],
      'comma-style': [2, 'last'],
      'constructor-super': 2,
      curly: [2, 'multi-line'],
      'dot-location': [2, 'property'],
      'eol-last': 2,
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'generator-star-spacing': [
        2,
        {
          before: true,
          after: true
        }
      ],
      'handle-callback-err': [2, '^(err|error)$'],
      indent: ['error', 2, { SwitchCase: 1 }],
      'jsx-quotes': [2, 'prefer-single'],
      'key-spacing': [
        2,
        {
          beforeColon: false,
          afterColon: true
        }
      ],
      'keyword-spacing': [
        2,
        {
          before: true,
          after: true
        }
      ],
      'new-cap': [
        2,
        {
          newIsCap: true,
          capIsNew: false
        }
      ],
      'new-parens': 2,
      'no-array-constructor': 2,
      'no-caller': 2,
      'no-console': 'off',
      'no-class-assign': 2,
      'no-cond-assign': 2,
      'no-const-assign': 2,
      'no-control-regex': 0,
      'no-delete-var': 2,
      'no-dupe-args': 2,
      'no-dupe-class-members': 2,
      'no-dupe-keys': 2,
      'no-duplicate-case': 2,
      'no-empty-character-class': 2,
      'no-empty-pattern': 2,
      'no-eval': 2,
      'no-ex-assign': 2,
      'no-extend-native': 2,
      'no-extra-bind': 2,
      'no-extra-boolean-cast': 2,
      'no-extra-parens': [2, 'functions'],
      'no-fallthrough': 2,
      'no-floating-decimal': 2,
      'no-func-assign': 2,
      'no-implied-eval': 2,
      'no-inner-declarations': [2, 'functions'],
      'no-invalid-regexp': 2,
      'no-irregular-whitespace': 2,
      'no-iterator': 2,
      'no-label-var': 2,
      'no-labels': [
        2,
        {
          allowLoop: false,
          allowSwitch: false
        }
      ],
      'no-lone-blocks': 2,
      'no-mixed-spaces-and-tabs': 2,
      'no-multi-spaces': 2,
      'no-multi-str': 2,
      'no-multiple-empty-lines': [
        2,
        {
          max: 1
        }
      ],
      'no-native-reassign': 2,
      'no-negated-in-lhs': 2,
      'no-new-object': 2,
      'no-new-require': 2,
      'no-new-symbol': 2,
      'no-new-wrappers': 2,
      'no-obj-calls': 2,
      'no-octal': 2,
      'no-octal-escape': 2,
      'no-path-concat': 2,
      'no-proto': 2,
      'no-redeclare': 2,
      'no-regex-spaces': 2,
      'no-return-assign': [2, 'except-parens'],
      'no-self-assign': 2,
      'no-self-compare': 2,
      'no-sequences': 2,
      'no-shadow-restricted-names': 2,
      'no-spaced-func': 2,
      'no-sparse-arrays': 2,
      'no-this-before-super': 2,
      'no-throw-literal': 2,
      'no-trailing-spaces': 2,
      'no-undef': 2,
      'no-undef-init': 2,
      'no-unexpected-multiline': 2,
      'no-unmodified-loop-condition': 2,
      'no-unneeded-ternary': [
        2,
        {
          defaultAssignment: false
        }
      ],
      'no-unreachable': 2,
      'no-unsafe-finally': 2,
      'no-unused-vars': [
        2,
        {
          vars: 'all',
          args: 'none'
        }
      ],
      'no-useless-call': 2,
      'no-useless-computed-key': 2,
      'no-useless-constructor': 2,
      'no-useless-escape': 0,
      'no-whitespace-before-property': 2,
      'no-with': 2,
      'one-var': [
        2,
        {
          initialized: 'never'
        }
      ],
      'operator-linebreak': [
        2,
        'after',
        {
          overrides: {
            '?': 'before',
            ':': 'before'
          }
        }
      ],
      'padded-blocks': [2, 'never'],
      quotes: [
        2,
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: true
        }
      ],
      semi: [2, 'never'],
      'semi-spacing': [
        2,
        {
          before: false,
          after: true
        }
      ],
      'space-before-blocks': [2, 'always'],
      'space-before-function-paren': [0, 'never'],
      'space-in-parens': [2, 'never'],
      'space-infix-ops': 2,
      'space-unary-ops': [
        2,
        {
          words: true,
          nonwords: false
        }
      ],
      'spaced-comment': [
        2,
        'always',
        {
          markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
        }
      ],
      'template-curly-spacing': [2, 'never'],
      'use-isnan': 2,
      'valid-typeof': 2,
      'wrap-iife': [2, 'any'],
      'yield-star-spacing': [2, 'both'],
      yoda: [2, 'never'],
      'prefer-const': 2,
      'no-debugger': process.env.MODE === 'production' ? 2 : 0,
      'object-curly-spacing': [
        2,
        'always',
        {
          objectsInObjects: true
        }
      ],
      'array-bracket-spacing': [2, 'never'],
      'max-len': [
        'error',
        {
          code: 150, // 代码行的最大长度，这里设置为 80 个字符
          tabWidth: 2, // 一个制表符的宽度
          ignoreUrls: true, // 忽略 URL 字符串
          ignoreComments: true, // 忽略注释
          ignoreStrings: true, // 忽略字符串
          ignoreTemplateLiterals: true, // 忽略模板字符串
          ignoreRegExpLiterals: true // 忽略正则表达式
        }
      ]
    }
  }
])
