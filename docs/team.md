<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/HuakunShen.png',
    name: 'Huakun Shen',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/HuakunShen' },
      { icon: 'twitter', link: 'https://twitter.com/huakunshen' }
    ]
  },
  {
    avatar: 'https://www.github.com/JackyKLai.png',
    name: 'Jacky Lai',
    title: 'Member',
    links: [
      { icon: 'github', link: 'https://github.com/JackyKLai' },
    ]
  }
]
</script>

# Our Team

<VPTeamMembers size="small" :members="members" />
