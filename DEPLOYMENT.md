# 🚀 FromToday 앱 배포 가이드

## ✅ 빌드 성공!
프로젝트가 정상적으로 빌드되었습니다!

---

## 1️⃣ Vercel 배포 (가장 쉬움! 추천!)

### 방법 A: 웹사이트에서 배포

1. **Vercel 가입**
   - https://vercel.com 접속
   - GitHub 계정으로 로그인

2. **프로젝트를 GitHub에 푸시** (아직 안 했다면)
   ```bash
   cd ~/Desktop/fromtoday-app
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/fromtoday-app.git
   git push -u origin main
   ```

3. **Vercel에서 Import**
   - "New Project" 클릭
   - GitHub 저장소 선택
   - "Deploy" 클릭!

   **끝!** 🎉 자동으로 배포됩니다!

### 방법 B: CLI로 배포 (더 빠름)

```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 로그인
vercel login

# 3. 배포!
cd ~/Desktop/fromtoday-app
vercel

# 4. 프로덕션 배포
vercel --prod
```

**배포 URL**: `https://fromtoday-app.vercel.app` (자동 생성)

---

## 2️⃣ Netlify 배포

### 방법 A: 드래그 앤 드롭

1. **빌드**
   ```bash
   cd ~/Desktop/fromtoday-app
   npm run build
   ```

2. **Netlify Drop**
   - https://app.netlify.com/drop 접속
   - `dist` 폴더를 드래그 앤 드롭!

   **끝!** 🎉

### 방법 B: CLI로 배포

```bash
# 1. Netlify CLI 설치
npm i -g netlify-cli

# 2. 로그인
netlify login

# 3. 배포
cd ~/Desktop/fromtoday-app
netlify deploy --prod
```

---

## 3️⃣ GitHub Pages 배포

1. **설정 추가**

   `vite.config.ts` 수정:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/fromtoday-app/', // 저장소 이름
   })
   ```

2. **배포 스크립트 추가**

   `package.json`에 추가:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **gh-pages 설치 및 배포**
   ```bash
   npm install --save-dev gh-pages
   npm run deploy
   ```

4. **GitHub Settings에서 활성화**
   - 저장소 → Settings → Pages
   - Source: gh-pages 브랜치 선택

**배포 URL**: `https://YOUR_USERNAME.github.io/fromtoday-app/`

---

## 4️⃣ Cloudflare Pages

1. **Cloudflare Pages 접속**
   - https://pages.cloudflare.com

2. **GitHub 연결**
   - "Create a project" 클릭
   - GitHub 저장소 선택

3. **빌드 설정**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - "Save and Deploy" 클릭!

---

## 🔒 환경 변수 설정 (중요!)

배포 플랫폼에서 환경 변수를 설정하세요:

### Vercel:
- Project Settings → Environment Variables
- `VITE_ANTHROPIC_API_KEY` 추가

### Netlify:
- Site settings → Environment variables
- `VITE_ANTHROPIC_API_KEY` 추가

### GitHub Pages:
- Settings → Secrets and variables → Actions
- `VITE_ANTHROPIC_API_KEY` 추가

---

## 📝 배포 체크리스트

- [ ] `npm run build` 성공 확인
- [ ] 환경 변수 설정 (API 키)
- [ ] `.env` 파일이 `.gitignore`에 있는지 확인
- [ ] 배포 후 테스트

---

## 🎉 추천 순서

1. **Vercel** (가장 쉽고 빠름)
2. **Netlify** (드래그 앤 드롭 편함)
3. **Cloudflare Pages** (빠른 속도)
4. **GitHub Pages** (무료지만 설정 필요)

---

## 💡 팁

- **커스텀 도메인**: 모든 플랫폼에서 무료로 연결 가능
- **자동 배포**: GitHub에 푸시하면 자동으로 배포됨
- **HTTPS**: 모두 무료 SSL 제공
- **무료 티어**: 개인 프로젝트는 모두 무료!

---

**만든이**: Designed by Ellie Kim with Claude 💙
