# Auto-Commit: A VSCode Extension

Auto-Commit 是一个 Visual Studio Code 扩展，用于通过检查 Git 暂存区的改动，自动生成符合 Conventional Commit 规范的 commit 信息。该扩展适合希望简化提交消息生成流程并遵循统一规范的开发者。

![](https://github.com/lynxife/auto-commit/blob/main/demo.gif?raw=true)
## 特性

- 读取 Git 暂存区的改动内容
- 调用 OpenAI API 自动生成 Commit 信息
- 自动生成的 Commit 信息符合 Commitizen 规范
- 提供可点击的图标按钮以触发插件功能
- 支持各种语言的 Commit 信息
- 用户可配置：

  - OpenAI API Key
  - Commit 信息的语言
  - 自动生成的 Commit 信息限制的最大字符数
  - 允许变更的文件最大字符数

## 安装

在 VSCode 中搜索 "Auto-Commit" 并点击 "Install" 按钮，或从 [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=your_publisher_name.auto-commit) 直接安装。

## 使用方法

1. 确保您已经安装并启用了 Auto-Commit 扩展。
2. 在 VSCode 设置中，找到 "Auto-Commit" 配置项，并根据需要进行配置：

    - 设置 "auto-commit.OPENAI_API_KEY" 为您的 OpenAI API Key.
    - 设置 "auto-commit.COMMIT_MESSAGE_LANGUAGE" 为您希望生成的 Commit 信息的语言，目前支持中文和英文。
    - 设置 "auto-commit.COMMIT_MESSAGE_MAX_CHARS" 为生成的 Commit 信息的最大字符数。
    - 设置 "auto-commit.MAX_FILE_CHANGES_CHARS" 为文件变更内容的最大字符数。

3. 在项目中进行更改并将更改添加到暂存区 (git add)。
4. 在 "Source Control" 面板的提交消息输入框旁边，单击 "Auto-Commit" 图标按钮。点击后，扩展将生成 Commit 信息并填充到输入框中。
5. 审核生成的 Commit 信息，如果满意，请提交更改。

## 开发者

### 本地开发

1. 克隆此仓库，切换到项目目录。
2. 在项目根目录运行 `pnpm install` 以安装依赖项。
3. 在 VSCode 中打开项目文件夹。
4. 按 F5 键运行项目。会弹出一个新的 Extension Development Host 窗口，并在其中启动插件。

### 贡献

本项目欢迎您的贡献！请在 GitHub 上提交问题报告或发起合并请求。

## 许可

项目使用 [MIT 许可证](LICENSE)。