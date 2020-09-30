## electron url scheme demo

自定义`electron` URL协议，通过在浏览器中输入`myapp://`即可调起`electron`应用程序。

### 实现方式

#### electron-builder

```json
{
  "build": {
    "productName": "electron-url-scheme",
    "protocols": [
      {
        "name": "myapp",
        "schemes": [
          "myapp"
        ]
      }
    ]
  }
}
```
#### 代码中实现

```js
const Protocol = 'myapp'
app.setAsDefaultProtocolClient(Protocol)
```