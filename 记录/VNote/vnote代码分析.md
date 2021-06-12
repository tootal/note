# vnote代码分析

vx_notebook

```cpp
static const QString &getConfigFolderName();
const QString &BundleNotebookConfigMgr::getConfigFolderName()
{
    return c_configFolderName;
}


const QString BundleNotebookConfigMgr::c_configFolderName = "vx_notebook";

const QString BundleNotebookConfigMgr::c_configName = "vx_notebook.json";

```

```cpp
BundleNotebookConfigMgr *BundleNotebook::getBundleNotebookConfigMgr() const
{
    return dynamic_cast<BundleNotebookConfigMgr *>(getConfigMgr().data());
}

```

```cpp
    // Abstract class for notebook config manager, which is responsible for config
    // files access and note nodes access.
    class INotebookConfigMgr : public QObject
```

```cpp
class VXNotebookConfigMgr : public BundleNotebookConfigMgr
```

```cpp
QString VXNotebookConfigMgrFactory::getName() const
{
    return QStringLiteral("vx.vnotex");
}
```

```cpp
// add current notebook task folder
    do {
        if (!m_notebookMgr) break;
        auto id =getNotebookMgr().getCurrentNotebookId();
        if (id == Notebook::InvalidId) break;
        qDebug() << "get current notebook";
        auto notebook = getNotebookMgr().findNotebookById(id);
        if (!notebook) break;
        if (notebook->getType() == "bundle.vnotex") {
            TaskMgr::addSearchPath(
                PathUtils::concatenateFilePath(
                    notebook->getRootFolderAbsolutePath(),
                    BundleNotebookConfigMgr::getConfigFolderName()
                )
            );
            
        }
    } while (0);
```

```
currentNotebookChanged


QString VXNotebookConfigMgrFactory::getName() const
{
    return QStringLiteral("vx.vnotex");
}


QSharedPointer<INotebookFactory> NotebookMgr::getBundleNotebookFactory() const
{
    return m_notebookServer->getItem(QStringLiteral("bundle.vnotex"));
}

```


## 变量替换 正则

[正则](https://regex101.com/r/Q3gmO2/1)

## 选中文本

```cpp
    class AbstractInputMode;

    // Use getSelections() to get current selection and selectedText() to
    // get selected text. QTextCursor may not reflect the real selection if it
    // is overridden.
    class VTEXTEDIT_EXPORT VTextEdit : public QTextEdit
```



```cpp
int MarkdownViewWindow::getEditLineNumber() const
{
    if (m_previousMode == Mode::Edit || m_previousMode == Mode::FocusPreview) {
        if (m_editor) {
            return m_editor->getTopLine();
        }
    }

    return -1;
}

int MarkdownViewWindow::getReadLineNumber() const
{
    if (m_previousMode == Mode::Read) {
        if (m_viewer) {
            return adapter()->getTopLineNumber();
        }
    }

    return -1;
}
```
ViewWindow


MarkdownViewWindow 有 MarkdownEditor 成员。

MarkdownEditor继承于VMarkdownEditor

VTextEditor继承于 VTextEditor

VTextEditor 有 VTextEdit 成员

VTextEdit 继承于 QTextEdit

```cpp

        // Get selected text by main selection.
        QString selectedText() const;

```




