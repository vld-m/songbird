export const GAME_DATA = {
  BIRD_STUB: {
    description: '',
    isAnswer: false,
    isSelected: false,
    name: '',
    species: '',
  },
  MAX_STAGE_SCORE: 5,
  STAGES: [
    {
      title: 'Разминка',
      birds: [
        {
          name: 'Ворон',
          species: 'Corvus corax',
          description:
            'Ворон – крупная птица. Длина тела достигает 70 сантиметров, размах крыльев – до полутора метров. Вороны населяют окрестности Тауэра. В Англии бытует поверье, что в день, когда черные вороны улетят от Тауэра, монархия рухнет.',
        },
        {
          name: 'Серый журавль',
          species: 'Grus grus',
          description:
            'Звуки, издаваемые журавлем, похожи на звонкое «кур-лы – кур-лы». Журавли чаще всего поют дуэтом – одна птица начинает запев со слога «кур», а вторая подхватывает «лы». Если птица поёт одна, то она издает только звук «кур».',
        },
        {
          name: 'Городская ласточка',
          species: 'Delichon urbicum',
          description:
            'Для ласточек характерно негромкое щебетание. Песни ласточек не смолкают на протяжении всего лета. Исследователи различают у птиц до 6 щебечущих звуков: «вит», «ви-вит», «чивит», «чиривит» и т.п. Ласточки любят петь дуэтом.',
        },
        {
          name: 'Обыкновенный козодой',
          species: 'Caprimulgus europaeus',
          description:
            'Козодой – неприметная птица, известная благодаря своему голосу. Песня козодоя звучит как монотонная трель похожая на тарахтение мотоцикла. Такое дребезжание слышно от заката до рассвета, его тональность, частота и громкость изменяются.',
        },
        {
          name: 'Обыкновенная кукушка',
          species: 'Cuculus canorus',
          description:
            'Кукушку назвали так из-за особенностей ее песен. Звонкое «ку-ку» не спутать ни с какой другой птицей. Кукушки не строят гнезда, их потомство выращивают другие виды пернатых, которым кукушки подбрасывают свои яйца.',
        },
        {
          name: 'Большая синица',
          species: 'Parus major',
          description:
            'В щебетании синиц различают более 40 различных звуковых сочетаний. Поют они практически круглый год, немного затихая только зимой. Синицы настоящие санитары леса. Одна пара синиц в период гнездования оберегает от вредителей десятки деревьев.',
        },
      ],
    },
    {
      title: 'Воробьиные',
      birds: [
        {
          name: 'TEST1',
          species: 'Parus major',
          description: 'TEST1',
        },
        {
          name: 'TEST2',
          species: 'Parus major',
          description: 'TEST2',
        },
      ],
    },
    { title: 'Лесные птицы', birds: [] },
    { title: 'Певчие птицы', birds: [] },
    { title: 'Хищные птицы:', birds: [] },
    { title: 'Морские птицы:', birds: [] },
  ],
};
