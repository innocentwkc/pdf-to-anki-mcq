<template>
  <nav>
    <ul>
      <li>
        <RouterLink to="/">Home</RouterLink>
      </li>
      <li>
        <RouterLink to="/ping">Tools</RouterLink>
        <ul>
          <li>
            <RouterLink to="/ping">Ping</RouterLink>
          </li>
          <li>
            <RouterLink to="/ping">Trace</RouterLink>
          </li>
          <li>
            <RouterLink to="/ping">Analyse</RouterLink>
          </li>
        </ul>
      </li>
      <li>
        <RouterLink to="/about">About</RouterLink>
      </li>
      <li>
        <RouterLink to="/contact">Contact</RouterLink>
      </li>
      <li>
        <RouterLink to="/faq">FAQ</RouterLink>
      </li>
      <li>
        <RouterLink to="/copyright">Copyright</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
  ul {
    list-style: none;
    li {

    }
  }
</style>