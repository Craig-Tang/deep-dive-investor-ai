# 推荐开发工具/配置清单

## 📋 工具清单概述

**目标：** 为React Demo项目提供完整的开发工具链配置  
**原则：** 效率优先、工具协同、质量保证、团队统一  
**适用：** 开发团队、新人入职、项目搭建参考  
**维护：** 定期更新工具版本和配置优化  

## 🛠️ 核心开发工具

### 1. 代码编辑器 - VS Code

#### 推荐版本
- **VS Code**: v1.85.0+ (最新稳定版)
- **Node.js**: v18.18.0+ (LTS版本)
- **npm**: v9.8.1+ (或yarn v1.22.19+)

#### 必装扩展
```json
{
  "recommendations": [
    // React & TypeScript
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "ms-vscode.vscode-eslint",
    "esbenp.prettier-vscode",
    
    // React专用
    "ms-vscode.vscode-react-native",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    
    // 开发体验
    "ms-vscode.vscode-json",
    "ms-vscode.vscode-css-formatter",
    "ms-vscode.vscode-html-formatter",
    "gruntfuggly.todo-tree",
    
    // Git集成
    "eamodio.gitlens",
    "github.vscode-pull-request-github",
    
    // 其他工具
    "ms-vscode.vscode-jest",
    "ms-vscode.vscode-markdown",
    "yzhang.markdown-all-in-one"
  ]
}
```

#### VS Code设置配置
```json
// .vscode/settings.json
{
  // 编辑器基础设置
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.detectIndentation": false,
  
  // TypeScript设置
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  
  // Tailwind CSS支持
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
  "tailwindCSS.experimental.classRegex": [
    "cn\\(([^)]*)\\)"
  ],
  
  // 文件关联
  "files.associations": {
    "*.css": "tailwindcss"
  },
  
  // 搜索排除
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.git": true,
    "**/coverage": true
  },
  
  // 文件监视排除
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/dist/**": true
  }
}
```

#### 工作区配置
```json
// .vscode/launch.json - 调试配置
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "request": "launch",
      "type": "chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```

### 2. 包管理器配置

#### npm配置
```bash
# .npmrc
# 使用国内镜像加速
registry=https://registry.npmmirror.com/

# 自动安装peer dependencies
auto-install-peers=true

# 生成package-lock.json
package-lock=true

# 保存精确版本
save-exact=true
```

#### package.json脚本
```json
{
  "scripts": {
    "dev": "vite --host 0.0.0.0 --port 5173",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "clean": "rm -rf dist node_modules/.cache"
  }
}
```

## ⚙️ 代码质量工具

### 1. ESLint配置

#### 安装依赖
```bash
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D eslint-plugin-react eslint-plugin-react-hooks
npm install -D eslint-plugin-jsx-a11y eslint-plugin-import
npm install -D eslint-config-prettier
```

#### ESLint配置文件
```javascript
// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'coverage'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react': react,
      'jsx-a11y': jsxA11y,
      'import': importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      
      // TypeScript规则
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/prefer-const': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      
      // React规则
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'warn',
      'react/no-unescaped-entities': 'off',
      
      // 代码质量规则
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      
      // 导入规则
      'import/order': ['error', {
        'groups': [
          'builtin',
          'external', 
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'always',
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true
        }
      }],
      
      // 可访问性规则
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/no-autofocus': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  },
);
```

### 2. Prettier配置

#### Prettier配置文件
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "quoteProps": "as-needed",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "embeddedLanguageFormatting": "auto",
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "css"
}
```

#### Prettier忽略文件
```bash
# .prettierignore
dist
coverage
node_modules
*.lock
*.log
.env*
public
```

### 3. TypeScript配置

#### 主配置文件
```json
// tsconfig.json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/types/*": ["./src/types/*"],
      "@/data/*": ["./src/data/*"],
      "@/lib/*": ["./src/lib/*"]
    }
  }
}
```

#### 应用配置
```json
// tsconfig.app.json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    
    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    
    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    
    /* Path mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

## 🚀 构建工具配置

### 1. Vite配置

#### 主配置文件
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  // 路径别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/data': path.resolve(__dirname, './src/data'),
      '@/lib': path.resolve(__dirname, './src/lib'),
    },
  },
  
  // 开发服务器配置
  server: {
    port: 5173,
    host: true,
    open: true,
    cors: true,
  },
  
  // 构建配置
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    
    // 代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          'utils-vendor': ['clsx', 'tailwind-merge', 'date-fns'],
        },
      },
    },
    
    // 性能警告阈值
    chunkSizeWarningLimit: 1000,
  },
  
  // 预览配置
  preview: {
    port: 4173,
    host: true,
  },
  
  // 环境变量
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
});
```

### 2. PostCSS配置

#### PostCSS配置
```javascript
// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
};
```

#### Tailwind配置
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
};

export default config;
```

## 🧪 测试工具配置

### 1. Jest配置

#### 安装测试依赖
```bash
npm install -D jest @types/jest
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event
npm install -D jest-environment-jsdom
```

#### Jest配置文件
```javascript
// jest.config.js
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  
  // 设置文件
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  
  // 模块映射
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  
  // 测试文件匹配
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{ts,tsx}',
  ],
  
  // 覆盖率设置
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/vite-env.d.ts',
  ],
  
  // 转换设置
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  
  // 模块文件扩展名
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // 静态资源模拟
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'jest-transform-stub',
  },
};
```

#### 测试设置文件
```typescript
// src/test/setup.ts
import '@testing-library/jest-dom';

// 模拟ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// 模拟matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

### 2. 测试辅助工具

#### 测试工具函数
```typescript
// src/test/utils.tsx
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';

// 自定义渲染函数
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <div data-testid="test-wrapper">
        {children}
      </div>
    );
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

export * from '@testing-library/react';
export { customRender as render };
```

## 🔧 Git配置

### 1. Git Hooks - Husky

#### 安装Husky
```bash
npm install -D husky lint-staged
npx husky install
npm pkg set scripts.prepare="husky install"
```

#### Pre-commit Hook
```bash
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

#### Lint-staged配置
```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

### 2. Git配置文件

#### .gitignore
```bash
# 依赖
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# 构建产物
dist/
build/
.next/
out/

# 环境变量
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# 日志
logs
*.log

# 运行时
pids
*.pid
*.seed
*.pid.lock

# 覆盖率报告
coverage/
*.lcov

# nyc测试覆盖率
.nyc_output

# IDE文件
.vscode/settings.json
.idea/
*.swp
*.swo

# 操作系统文件
.DS_Store
Thumbs.db

# 临时文件
tmp/
temp/
```

#### .gitattributes
```bash
# 文本文件标准化行结束符
* text=auto

# 源代码文件
*.js text eol=lf
*.ts text eol=lf
*.tsx text eol=lf
*.jsx text eol=lf
*.json text eol=lf
*.md text eol=lf
*.css text eol=lf
*.scss text eol=lf
*.html text eol=lf

# 二进制文件
*.png binary
*.jpg binary
*.gif binary
*.ico binary
*.pdf binary
```

## 📱 浏览器开发工具

### 1. Chrome扩展推荐

#### React开发相关
- **React Developer Tools**: React组件树查看和调试
- **Redux DevTools**: Redux状态调试 (如果使用Redux)
- **React Hook Form DevTools**: 表单调试工具

#### 开发效率工具
- **JSON Viewer**: JSON格式化查看
- **ColorZilla**: 颜色提取工具
- **WhatFont**: 字体识别工具
- **Lighthouse**: 性能和质量审计

### 2. 开发者工具配置

#### Chrome DevTools设置
```javascript
// 控制台自定义函数
window.logComponent = (component) => {
  console.group(`Component: ${component.displayName || component.name}`);
  console.log('Props:', component.props);
  console.log('State:', component.state);
  console.groupEnd();
};

window.logPerformance = () => {
  console.log('Performance Metrics:', performance.getEntriesByType('navigation'));
};
```

## 🌐 部署工具配置

### 1. 生产构建优化

#### 环境变量配置
```bash
# .env.development
VITE_API_URL=http://localhost:3000/api
VITE_APP_ENV=development
VITE_ENABLE_DEVTOOLS=true

# .env.production
VITE_API_URL=https://api.example.com
VITE_APP_ENV=production
VITE_ENABLE_DEVTOOLS=false
```

#### 构建脚本优化
```json
{
  "scripts": {
    "build:analyze": "vite build && npx vite-bundle-analyzer dist",
    "build:dev": "vite build --mode development",
    "build:staging": "vite build --mode staging",
    "build:production": "vite build --mode production",
    "preview": "vite preview --port 4173 --host"
  }
}
```

### 2. Docker配置

#### Dockerfile
```dockerfile
# 多阶段构建
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# 生产镜像
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Nginx配置
```nginx
# nginx.conf
server {
    listen 80;
    server_name localhost;
    
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Gzip压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
```

## 📋 工具版本管理

### 推荐版本
| 工具 | 版本 | 说明 |
|------|------|------|
| **Node.js** | v18.18.0+ | LTS版本，稳定性好 |
| **npm** | v9.8.1+ | 与Node.js配套 |
| **TypeScript** | v5.5.3+ | 最新稳定版 |
| **React** | v18.3.1+ | 最新稳定版 |
| **Vite** | v5.4.1+ | 构建工具 |
| **ESLint** | v9.9.0+ | 代码检查 |
| **Prettier** | v3.0.0+ | 代码格式化 |

### 版本锁定策略
```json
// package.json - 使用精确版本
{
  "engines": {
    "node": ">=18.18.0",
    "npm": ">=9.8.1"
  },
  "dependencies": {
    "react": "18.3.1",
    "react-dom": "18.3.1"
  }
}
```

## 🚀 自动化工具

### 1. GitHub Actions工作流

#### CI/CD配置
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Type check
      run: npm run type-check
    
    - name: Lint
      run: npm run lint
    
    - name: Test
      run: npm run test:coverage
    
    - name: Build
      run: npm run build
```

### 2. 依赖更新自动化

#### Renovate配置
```json
// renovate.json
{
  "extends": [
    "config:base"
  ],
  "schedule": [
    "before 4am on monday"
  ],
  "packageRules": [
    {
      "matchUpdateTypes": ["minor", "patch"],
      "automerge": true
    }
  ]
}
```

## 📚 开发文档工具

### 1. Storybook (可选)

#### 安装Storybook
```bash
npx storybook@latest init
```

#### Storybook配置
```javascript
// .storybook/main.js
export default {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};
```

## 📋 工具使用总结

### 团队协作建议
1. **统一开发环境**: 所有成员使用相同的工具版本
2. **配置共享**: 通过项目配置文件统一设置
3. **定期更新**: 每季度review和更新工具链
4. **培训指导**: 为新成员提供工具使用培训

### 效率提升点
- **自动化格式**: 保存时自动格式化代码
- **类型检查**: 编写时实时类型提示
- **热更新**: 开发时快速查看变更效果
- **调试工具**: 浏览器开发者工具高效调试

### 质量保证
- **预提交检查**: 自动运行代码检查和测试
- **持续集成**: 自动化构建和部署流程
- **性能监控**: 构建产物大小和性能监控
- **依赖安全**: 定期检查和更新依赖包

这个工具配置清单为团队提供了完整的开发环境搭建指南，确保所有成员都能在统一、高效的环境中进行开发工作。

---

**工具清单版本**: v1.0  
**适用项目**: React Demo - 深度投资AI  
**更新周期**: 每季度review  
**维护人员**: 前端技术团队