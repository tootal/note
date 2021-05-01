# VNote图标随主题变化
import_export_menu
new_note
new_folder


```cpp
    QVector<IconUtils::OverriddenColor> colors;
    colors.push_back(IconUtils::OverriddenColor(fg, QIcon::Normal));
    colors.push_back(IconUtils::OverriddenColor(disabledFg, QIcon::Disabled));

    auto iconFile = themeMgr.getIconFile(p_iconName);
    return IconUtils::fetchIcon(iconFile, colors);
```


```cpp

QIcon IconUtils::fetchIcon(const QString &p_iconFile,
                           const QVector<OverriddenColor> &p_overriddenColors)
{
    const auto suffix = QFileInfo(p_iconFile).suffix().toLower().toStdString();
    if (p_overriddenColors.isEmpty() || suffix != "svg") {
        return QIcon(p_iconFile);
    }

    auto content = FileUtils::readTextFile(p_iconFile);
    if (content.isEmpty()) {
        return QIcon();
    }

    QIcon icon;
    for (const auto &color : p_overriddenColors) {
        auto overriddenContent = replaceForegroundOfIcon(content, color.m_foreground);
        auto data = overriddenContent.toLocal8Bit();
        QPixmap pixmap;
        pixmap.loadFromData(data, suffix.c_str());
        icon.addPixmap(pixmap, color.m_mode, color.m_state);
    }

    return icon;
}

QIcon IconUtils::fetchIcon(const QString &p_iconFile, const QString &p_overriddenForeground)
{
    QVector<OverriddenColor> colors;
    if (!p_overriddenForeground.isEmpty()) {
        colors.push_back(OverriddenColor(p_overriddenForeground, QIcon::Normal, QIcon::Off));
    }

    return fetchIcon(p_iconFile, colors);
}
```
## 替换前景色

正则表达式：

```reg
(\s|"|;)(fill|stroke)(:|(="))#[^#"\s]+
```

```svg
<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1603888581327" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3351" width="512" height="512" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M859.882667 768H703.893333v-155.989333a35.968 35.968 0 1 0-72.021333 0V768H483.946667a35.968 35.968 0 1 0 0 72.021333h148.010666v147.968a35.968 35.968 0 1 0 71.978667 0v-147.968h155.989333a35.968 35.968 0 1 0 0-72.021333z m15.104-466.218667L597.013333 21.333333a77.44 77.44 0 0 0-14.805333-11.52 60.928 60.928 0 0 0-4.394667-2.261333c-0.938667-0.512-1.92-0.896-2.816-1.28A72.362667 72.362667 0 0 0 545.898667 0h-346.026667C160.106667 0 127.893333 32.213333 127.893333 72.021333v880C127.893333 991.744 160.106667 1024 199.914667 1024h211.968a35.968 35.968 0 1 0 0-72.021333H199.914667V72.021333H511.893333v240C511.893333 351.786667 544.106667 384 583.914667 384h239.957333v155.989333a35.968 35.968 0 1 0 72.021333 0V352.512c0-19.029333-7.509333-37.205333-20.906666-50.730667z m-291.114667 10.24V110.421333l199.808 201.557334h-199.765333z" p-id="3352" fill="#000000"></path></svg>
```

[匹配SVG的正则表达式](https://regex101.com/r/IZ55zr/1)

