import { Composition } from 'remotion'
import { PuppyWhippiesAd } from './PuppyWhippiesAd'

export const RemotionRoot = () => {
  return (
    <Composition
      id="PuppyWhippiesAd"
      component={PuppyWhippiesAd}
      durationInFrames={450}
      fps={30}
      width={1080}
      height={1080}
    />
  )
}
