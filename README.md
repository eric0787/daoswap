# 步骤1：检测是否安装 nodejs

#### 1.打开 【终端】 输入： node --version，如返回【版本号】则证明电脑中已安装过，则【跳过】步骤 2，如未安装则参照【步骤 2】。

```
示例如下：
passenger@192 ~ % node --version
v24.12.0
```

# 步骤2：安装 nodejs

#### 1. 先安装 nvm 【复制下面命令在终端执行】
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
#### 2. 使用 nvm 安装 nodejs 【复制下面命令在终端执行】
```
nvm install --lts
```
# 步骤3：检测是否安装 yarn 

#### 1.打开 【终端】 输入： yarn --version，如返回【版本号】则证明电脑中已安装过，则【跳过】步骤 4，如未安装则参照【步骤 4】。

```
示例如下：
passenger@192 ~ % yarn --version
1.22.22
```

# 步骤4：安装 yarn
#### 1. 安装 Homebrew  【复制下面命令在 终端 执行】
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
#### 2. 安装 yarn 【复制下面命令在 终端 执行】
```
brew install yarn
```

# 步骤5：部署 v3-core 合约
#### 1. 配置 私钥：进入项目 v3-core 文件夹，把 example.env 改成 .env ，将私钥粘贴到 PRIVATE_KEY后面的 双引号之内。

#### 2. 安装部署时需要的插件
```
yarn install
```

#### 3. 部署合约 【复制下面命令执行】
```
npx hardhat run scripts/deploy.ts --network mainnet
```

#### 4. 部署过程中会有类似以下重要信息打印出来，部署完成后请复制保存好：
```
UniswapV3Factory address=> ***************************
POOL_INIT_CODE_HASH=> ***************************
```

# 步骤6：部署 v3-periphery 合约
#### 1. 配置 私钥 和 core合约地址：进入项目 v3-periphery 文件夹，把 example.env 改成 .env，将私钥粘贴到 PRIVATE_KEY 后面的双引号之内。将前面保存的 UniswapV3Factory 地址粘贴到 FACTORY_ADDRESS 后面的双引号之内。

#### 2. 安装部署时需要的插件
```
yarn install
```

#### 3. 检查下 POOL_INIT_CODE_HASH 是否一致（比对下后4-6位即可），一致则部署，不一致则用前面保存的 POOL_INIT_CODE_HASH 进行覆盖。（基本不会出现这个情况，检查下比较稳妥）
```
文件路径：contracts/libraries/PoolAddress.sol 文件中的
bytes32 internal constant POOL_INIT_CODE_HASH = ***************************;
```

#### 4. 部署合约 【复制下面命令执行】
```
npx hardhat run scripts/deploy.ts --network mainnet
```
#### 5. 部署过程中会有类似以下重要信息打印出来，部署完成后请复制保存好：
```
QuoterV2 address=> => ***************************
SwapRouter address=> => ***************************
NFTDescriptor address=> => ***************************
NonfungibleTokenPositionDescriptor address=> => ***************************
NonfungiblePositionManager address=> => ***************************
V3Migrator address=> => ***************************
```

# 步骤7：至此合约已部署完成，请将所有保存好的信息发给前端技术人员，进行对接调试。