export default defineEventHandler(() => {
  // await new Promise(resolve => setTimeout(resolve, 2000));
  const users = [
    { place: 1, username: 'Логин1', rating: 800000 },
    { place: 2, username: 'Логин2', rating: 758421 },
    { place: 3, username: 'Логин3', rating: 716842 },
    { place: 4, username: 'Логин4', rating: 675263 },
    { place: 5, username: 'Логин5', rating: 633684 },
    { place: 6, username: 'Логин6', rating: 592105 },
    { place: 7, username: 'Логин7', rating: 550526 },
    { place: 8, username: 'Логин8', rating: 508947 },
    { place: 9, username: 'Логин9', rating: 467368 },
    { place: 10, username: 'Логин10', rating: 425789 },
    { place: 11, username: 'Логин11', rating: 384210 },
    { place: 12, username: 'Логин12', rating: 342631 },
    { place: 13, username: 'Логин13', rating: 301052 },
    { place: 14, username: 'Логин14', rating: 259473 },
    { place: 15, username: 'Логин15', rating: 217894 },
    { place: 16, username: 'Логин16', rating: 176315 },
    { place: 17, username: 'Логин17', rating: 134736 },
    { place: 18, username: 'Логин18', rating: 93157 },
    { place: 19, username: 'Логин19', rating: 51578 },
    { place: 20, username: 'Логин20', rating: 1000 }
  ]

  const response = {
    users: users,
    // current: { place: 20, username: 'cref', rating: 1000 }
    // current: null
    current: { place: 4, username: 'Логин4', rating: 675263 }
  }

  return response
})