<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import gsap from 'gsap'
import type { RocketBetCard } from '~/types/rocketBetCard'
import { demoGameKey } from '~/types/demoGame'
import { getTimeCoef, sendGameResult } from '~/utils/gameFunctions/rocket/functions'

const { user, session, loggedIn } = useUserSession()


const targetY = ref(400)
const maxXParam = ref(600)
const animationDuration = ref(15)
const maxMultiplier = ref(1.2)


const GOLDEN_RATIO = 1.6180
const MARGINS = { left: 40, right: 20, top: 20, bottom: 40 }
const ROCKET_SIZE = 80

const STAGE_1_DURATION = 2

const canvas = ref<HTMLCanvasElement | null>(null)
const multiplier = ref(0.0)
const multiplierScale = ref(1)
const isAnimating = ref(false)

let rocketImg: HTMLImageElement | null = null
let axesCanvas: HTMLCanvasElement | null = null
let mainTimeline: gsap.core.Timeline | null = null
let wobbleTimeline: gsap.core.Timeline | null = null

const rotation = ref(0) 
const crashed = ref(false)
const roundId = ref<string | null>(null)
const isCashouting = ref(false)

watch(crashed, (isCrashed) => {
  if (rocketImg) {
    rocketImg.src = isCrashed ? 'TablerRocketRed.svg' : 'TablerRocket.svg'
  }
})

const stars: { x: number; y: number; speed: number; size: number }[] = []
const STAR_COUNT = 80

const state = {
  t: 0,
  running: false,
  runningStage1: false,
  runningStage2: false,
  x: 0, 
  y: 0,
  cameraWobbleX: 0,
  cameraWobbleY: 0,
}

let w = 0, h = 0, displayWidth = 0, displayHeight = 0, drawableWidth = 0, maxX = 0, baseline = 0
let dpr = 1
let POINT_B_X = 0 

function setupSizes() {
  if (!canvas.value || !canvas.value.parentElement) return

  dpr = window.devicePixelRatio || 1
  
  displayWidth = canvas.value.parentElement.clientWidth
  displayHeight = displayWidth / GOLDEN_RATIO

  w = Math.floor(displayWidth * dpr)
  h = Math.floor(displayHeight * dpr)
  
  drawableWidth = displayWidth - MARGINS.left - MARGINS.right
  
  maxX = maxXParam.value 
  
  POINT_B_X = maxX * 0.4
  
  baseline = displayHeight - MARGINS.bottom

  state.x = 0
  state.y = baseline

  stars.length = 0
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * displayWidth,
      y: Math.random() * displayHeight,
      speed: 0.5 + Math.random() * 1.5,
      size: Math.random() * 2 + 1,
    })
  }
}

function trajectory(x: number) {
  const exponent = 1.1

  const expScale = targetY.value / Math.pow(maxX / 100, exponent) / 30 
  const baseY = Math.pow(x / 100, exponent) * 30 * expScale
  const wobble = 10 * Math.sin((x / 40) + (x / 200)) * 3/4
  return baseY + wobble
}

function prepareAxesCanvas() {
  axesCanvas = document.createElement('canvas')
  axesCanvas.width = Math.floor(displayWidth * dpr)
  axesCanvas.height = Math.floor(displayHeight * dpr)
  const octx = axesCanvas.getContext('2d')!
  octx.setTransform(dpr, 0, 0, dpr, 0, 0)
  octx.clearRect(0, 0, displayWidth, displayHeight)

  octx.lineWidth = 5
  octx.strokeStyle = '#ccc'
  octx.beginPath()
  octx.moveTo(MARGINS.left, baseline)
  octx.lineTo(displayWidth - MARGINS.right, baseline)
  octx.moveTo(MARGINS.left, baseline)
  octx.lineTo(MARGINS.left, MARGINS.top)
  octx.stroke()
}

function drawBackground(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#12384f'
  ctx.fillRect(0, 0, displayWidth, displayHeight)

  ctx.fillStyle = 'rgba(255,255,255,0.8)'
  for (const s of stars) {
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
    ctx.fill()

    s.x -= s.speed
    if (s.x < 0) {
      s.x = displayWidth + 5
      s.y = Math.random() * displayHeight
    }
  }
}

function renderFrame(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, displayWidth, displayHeight)

  drawBackground(ctx)

  if (axesCanvas) ctx.drawImage(axesCanvas, 0, 0, displayWidth, displayHeight)

  ctx.save()
  ctx.translate(-state.cameraWobbleX, -state.cameraWobbleY)

  if (rocketImg && rocketImg.complete) {
    const imgW = ROCKET_SIZE
    const imgH = ROCKET_SIZE

    const visualX = (state.x / maxX) * drawableWidth

    ctx.save()
    ctx.translate(MARGINS.left + visualX, state.y) 
    ctx.rotate((rotation.value * Math.PI) / 180) 
    ctx.drawImage(rocketImg, -imgW / 2, -imgH / 2, imgW, imgH)
    
    ctx.restore()
  }

  ctx.restore()
}

function startGame() {
  if (!canvas.value) return
  const ctx = canvas.value.getContext('2d')!
  win.value = false

  if (mainTimeline) mainTimeline.kill()
  if (wobbleTimeline) wobbleTimeline.kill()
  isAnimating.value = true

  state.t = 0
  state.running = true
  state.runningStage1 = true
  state.runningStage2 = false
  state.x = 0 
  state.y = baseline
  state.cameraWobbleX = 0
  state.cameraWobbleY = 0
  multiplier.value = 0.0
  rotation.value = 0  
  crashed.value = false 

  prepareAxesCanvas()
  renderFrame(ctx)

  mainTimeline = gsap.timeline()

  mainTimeline.to(state, {
    t: POINT_B_X / maxX, 
    duration: STAGE_1_DURATION,
    ease: 'power1.inOut',
    onUpdate: () => {
      state.x = state.t * maxX 
      state.y = baseline - trajectory(state.x)
      renderFrame(ctx)
    },
    onComplete: () => {
      state.runningStage1 = false
      state.runningStage2 = true
      state.x = POINT_B_X 
      state.y = baseline - trajectory(POINT_B_X)
    }
  })

  mainTimeline.addLabel('stage2')

  wobbleTimeline = gsap.timeline({ repeat: -1 })
  wobbleTimeline.to(state, { cameraWobbleX: 3, cameraWobbleY: 2, duration: 0.3, ease: 'sine.inOut' })
  wobbleTimeline.to(state, { cameraWobbleX: 0, cameraWobbleY: 0, duration: 0.4, ease: 'sine.inOut' })
  wobbleTimeline.to(state, { cameraWobbleX: -3, cameraWobbleY: -2, duration: 0.4, ease: 'sine.inOut' })
  wobbleTimeline.to(state, { cameraWobbleX: 0, cameraWobbleY: 0, duration: 0.3, ease: 'sine.inOut' })

  mainTimeline.add(wobbleTimeline, 'stage2')

  const stage2Duration = animationDuration.value - STAGE_1_DURATION
  mainTimeline.to(multiplier, {
    value: maxMultiplier.value,
    duration: stage2Duration > 0 ? stage2Duration : 5,
    ease: 'power1.in',
    onUpdate: () => {
      gsap.fromTo(multiplierScale, { value: 1.1 }, { value: 1, duration: 0.3, overwrite: true })
      renderFrame(ctx)
    },
    onComplete: () => {
      state.running = false
      state.runningStage2 = false
      if (wobbleTimeline) wobbleTimeline.kill()

      if (win.value === false) {
        wonLostAmount.value = -bet.value
        gsap.to(rotation, {
          value: 135,
          duration: 0.5,
          ease: 'power2.in',
          onUpdate: () => renderFrame(ctx),
          onComplete:() => {
            crashed.value = true
            isAnimating.value = false
            if (session.value && demoGame.value === false) {
              sendGameResult({
                winLostAmount: wonLostAmount.value,
                bet: bet.value,
                login: user.value?.id,
              }).catch(err => {
                console.error('Failed to register loss:', err)
              })
            }
          }
        })

      } else {
        isAnimating.value = false
      }
    }
  }, 'stage2')
}

let handleResize: () => void;

onMounted(() => {
  if (!canvas.value) return

  handleResize = () => {
    if (!canvas.value) return
    
    setupSizes() 

    canvas.value.width = w
    canvas.value.height = h
    canvas.value.style.width = displayWidth + 'px'
    canvas.value.style.height = displayHeight + 'px'

    const ctx = canvas.value.getContext('2d')!
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    prepareAxesCanvas() 
    renderFrame(ctx)    
  }

  window.addEventListener('resize', handleResize)
  handleResize()

  const ctx = canvas.value.getContext('2d')!

  rocketImg = new Image()
  rocketImg.src = 'TablerRocket.svg'
  rocketImg.onload = () => {
    prepareAxesCanvas() 
    renderFrame(ctx)
  }

  function loop() {
    if (!state.running) {

    }
    if (state.running) renderFrame(ctx)
    requestAnimationFrame(loop)
  }
  loop()
})

onBeforeUnmount(() => {
  if (handleResize) {
    window.removeEventListener('resize', handleResize)
  }

  if (mainTimeline) mainTimeline.kill()
  if (wobbleTimeline) wobbleTimeline.kill()
  gsap.killTweensOf(state)
  gsap.killTweensOf(multiplier)
  gsap.killTweensOf(multiplierScale)
  gsap.killTweensOf(rotation)
})

const bet = ref()
const coef = ref()
const win = ref<boolean>(false)
const balance = ref()
const wonLostAmount = ref()
async function placeBet({ bet: betValue, coef: coefValue }: RocketBetCard){
  bet.value = betValue
  coef.value = coefValue

  const gameParams = getTimeCoef()
  
  animationDuration.value = gameParams.animTime
  maxMultiplier.value = gameParams.coef

  startGame()
}
const viewGameDescription = ref(false)
const game = {
  id: 2, 
  title: 'Ракета',
  description: 'Описание игры'
}

function selectGame() {
  viewGameDescription.value = true
}
async function cashOut(payload?: { bet?: number; totalWin?: string }) {
  // prevent double cashouts
  if (!state.running || isCashouting.value) return

  isCashouting.value = true

  // capture current multiplier (the value GSAP is animating)
  const currentMultiplier = Number(multiplier.value || 0)

  // stop client-side animation immediately and remove any future callbacks
  try {
    // kill timelines / tweens so onComplete handlers won't run later
    if (mainTimeline) { mainTimeline.kill(); mainTimeline = null }
    if (wobbleTimeline) { wobbleTimeline.kill(); wobbleTimeline = null }
    gsap.killTweensOf(multiplier)
    gsap.killTweensOf(multiplierScale)
    // mark local state as stopped
    state.running = false
    state.runningStage1 = false
    state.runningStage2 = false

    // small visual feedback: pop the multiplier
    gsap.fromTo(multiplierScale, { value: 1 }, { value: 1.35, duration: 0.12, yoyo: true, repeat: 1 })

    // send cashout request to server — prefer roundId to identify the round

    win.value = true
    const winAmount = bet.value * currentMultiplier
    wonLostAmount.value = winAmount
    if (session.value && demoGame.value === false) {
      await sendGameResult({
        winLostAmount: winAmount,
        bet: bet.value,
        login: user.value?.id,
      })
    }
    // Анимация выигрыша
    // if (res.win) {
    //   gsap.to(rotation, { value: 0, duration: 0.5, ease: 'power2.out' })
    // } else {
    //   // server may decide it crashed before your cashout -> show crash animation
    //   gsap.to(rotation, {
    //     value: 135,
    //     duration: 0.6,
    //     ease: 'power2.in',
    //     onComplete: () => {
    //       crashed.value = true
    //     }
    //   })
    // }
  } catch (err) {
    console.error('cashOut error', err)
  } finally {
    isCashouting.value = false
    isAnimating.value = false
    roundId.value = null
  }
}

const demoGame = ref(false)
watch(
  () => loggedIn.value,
  (isLoggedIn) => {
    if (!isLoggedIn) {
      demoGame.value = true
    }
  },
  { immediate: true }
)
const loggedOut = computed(() => !loggedIn.value)
function changeDemoStatus(){
  demoGame.value = !demoGame.value
  // console.log(demoGame.value)
}
provide(demoGameKey, {
  demoGame: readonly(demoGame),
  loggedOut: loggedOut,
  changeDemoStatus,
})

</script>


<template>
  <section class="game-section">
    <div class="crash-wrapper">
      <div class="multiplier-display"
           :style="{ transform: `scale(${multiplierScale})`, color: crashed ? '#eb3a34' : '#10C5E1' }">
        x{{ multiplier.toFixed(2) }}
      </div>
      <canvas ref="canvas" />      
    </div>
    <AppGameBet @submit="placeBet" @show-descr="selectGame" @cash-out="cashOut"
                  :bet="bet" 
                  :win="win" 
                  :balance="balance" 
                  :is-animating="isAnimating"
                  :current-multiplier="multiplier.toFixed(2)"
                  />
    <AppAboutGame v-if="viewGameDescription === true " :game="game"  @close="viewGameDescription = false"/>
  </section>
</template>

<style scoped>
.game-section{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 3rem 7rem;
  gap: 2rem;
  background: transparent;
}

.crash-wrapper {
  width: 100%; 
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 350px;
}

.multiplier-display {
  position: absolute;
  top: 2rem;
  font-size: 2rem;
  color: #10C5E1;
  font-weight: bold;
  text-shadow: 0 0 10px #42b88388;
  transition: transform 0.2s ease-out;
  z-index: 10;
}

canvas {
  border: none;
  border-radius: 12px;
  display: block;
  color: rgba(16, 197, 225, 1);
  max-width: 100%; 
}

button {
  padding: 12px 24px;
  font-size: 16px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

button:hover {
  background: #35a372;
}

button:active {
  transform: scale(0.98);
}
</style>