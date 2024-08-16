<template>
    <div>
            <button class="add-transaction-btn">Add transaction</button>
    </div>
</template>
<style scoped>
.add-transaction-btn {
    position: fixed;
    bottom: 20px;
    right: 60px;
  cursor: pointer;
  background-color: #9c88ff;
  box-shadow: var(--box-shadow);
  color: #fff;
  border: 0;
  display: block;
  font-size: 16px;
  margin: 10px 0 30px;
  padding: 10px;
  width: 50%;
}
@media screen and (min-width: 600px) {
    .add-transaction-btn {
    position: fixed;
    bottom: 20px;
    right: 120px;
  cursor: pointer;
  background-color: #9c88ff;
  box-shadow: var(--box-shadow);
  color: #fff;
  border: 0;
  display: block;
  font-size: 16px;
  margin: 10px 0 30px;
  padding: 10px;
  width: 40%;
}
}

</style>