<template>
  <main>
    <div class="sf-card">
      <h2>MyDrugs Replica made by Dalpb</h2>
      <div class="sf-c-box">
        <a href="https://github.com/Dalpb" target="_blank">
          <button class="sf-box github">
            <img src="/images/github.png" />
            <p>Dalpb</p>
          </button>
        </a>
        <a
          href="https://www.linkedin.com/in/diegopalominobarrientos/"
          target="_blank"
        >
          <button class="sf-box lkldn">
            <img src="/images/lkdn.png" />
            <p>Diego Palomino</p>
          </button>
        </a>
      </div>
      <h2>Collaborators who show me how wonderful Vue is:</h2>
      <div class="sf-c-box">
        <a href="https://github.com/Fidnix" target="_blank">
          <button class="sf-box github">
            <img src="/images/github.png" />
            <p>Fidnix</p>
          </button>
        </a>
        <a
          href="https://www.linkedin.com/in/fidel-apari-189164359/"
          target="_blank"
        >
          <button class="sf-box lkldn">
            <img src="/images/lkdn.png" />
            <p>Fidnix</p>
          </button>
        </a>
      </div>
      <h2>What the hell is MyDrugs?</h2>
      <div class="sf-c-box">
        <a href="https://www.netflix.com/title/80218448" target="_blank">
          <button class="sf-box netflix">
            <img src="/images/netflix.webp" />
            <p>Netflix serie</p>
          </button>
        </a>
      </div>
      <pre>
        _______   _____
       /\/\/\/\  |  "o  \
     <|\/\/\/\/_/ /____/
      |__________/
      |_|_| /_/_/
       Remember Me,Lenny?
      </pre>
    </div>
  </main>
</template>
<style lang="css" scoped>
main {
  margin: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}
.sf-card {
  width: 70%;
  padding: 1.5rem;
  border: solid 0.4rem;
  max-width: 65rem;
  border-radius: 2rem;
  border-color: white;
  color: white;
  text-align: center;
}
.sf-c-box {
  justify-content: space-evenly;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.sf-box {
  border: none;
  width: 15rem;
  border-radius: 1rem;
  height: 6rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: white;

  & > img {
    height: 100%;
    object-fit: fill;
  }
  & > p {
    flex: 1;
    text-align: center;
    font-weight: bold;
    font-size: 1.2rem;
  }
}

.github {
  background-color: #484f58;
}
.lkldn {
  background-color: #007fbc;
}
.netflix {
  background-color: black;
}
</style>
