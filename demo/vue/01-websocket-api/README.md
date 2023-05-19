### 1. 创建用户

* 客户端-》服务端

| 属性      | 值          |
| --------- | ----------- |
| type      | 1           |
| uname     | XXX         |
| pic       | data-base64 |
| introduce | XXX         |

存入数据库users中 uid（唯一标识）、uname、pic、introduce、time

* 服务端-》客户端（全部）

| 属性   | 值             |
| ------ | -------------- |
| status | 200（400失败） |
| type   | 1              |
| uname  | XXX            |
| uid    | XXX            |

本地保存 uname、uid、pic、introduce

+++

### 2. 创建群聊

* 客户端-》服务端

| 属性      | 值          |
| --------- | ----------- |
| type      | 2           |
| gname     | XXX         |
| pic       | data-base64 |
| introduce | XXX         |
| uid       | XXX         |

存入数据库groups中 gid（唯一标识）、gname、pic、users('uid')、introduce、time

* 服务端-》客户端（全部）

| 属性   | 值   |
| ------ | ---- |
| status | 200  |
| type   | 2    |
| gname  | XXX  |
| gid    | XXX  |

本地保存 gname、gid、pic、introduce

+++

### 3.  给联系人发信息



