const getComments = (toGet: number) => {
    console.log("get " + toGet +" comments")
    if(toGet >= allComments.length )
        return allComments
    return [ ...allComments.slice(0, toGet)] 
}

export default getComments;

const allComments = [
    {
        key: '0',
        avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
        username: "User1",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        dataOfPublish: "2022-03-01",
      },
      {
        key: '1',
        avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
        username: "User2",
        content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        dataOfPublish: "2022-03-02",
      },
      {
        key: '2',
        avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
        username: "User3",
        content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        dataOfPublish: "2022-03-03",
      },
      {
        key: '3',
        avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
        username: "User4",
        content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        dataOfPublish: "2022-03-04",
      },
      {
        key: '4',
        avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg",
        username: "User5",
        content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        dataOfPublish: "2022-03-05",
      },
      {
        key: '5',
        avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
        username: "User6",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        dataOfPublish: "2022-03-06",
      },
      {
        key: '6',
        avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg",
        username: "User7",
        content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        dataOfPublish: "2022-03-07",
      },
      {
        key: '7',
        avatarUrl: "https://randomuser.me/api/portraits/men/4.jpg",
        username: "User8",
        content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        dataOfPublish: "2022-03-08",
      },
      {
        key: '8',
        avatarUrl: "https://randomuser.me/api/portraits/women/5.jpg",
        username: "User9",
        content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        dataOfPublish: "2022-03-09",
      },
      {
        key: '9',
        avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg",
        username: "User10",
        content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        dataOfPublish: "2022-03-10",
      },
      {
        key: '10',
        avatarUrl: "https://randomuser.me/api/portraits/women/6.jpg",
        username: "User11",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        dataOfPublish: "2022-03-11",
      },
      {
        key: '11',
        avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
        username: "User12",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        dataOfPublish: "2022-03-01",
      },
      {
        key: '12',
        avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
        username: "User13",
        content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        dataOfPublish: "2022-03-02",
      },
      {
        key: '13',
        avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
        username: "User14",
        content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        dataOfPublish: "2022-03-03",
      },
      {
        key: '14',
        avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg",
        username: "User15",
        content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        dataOfPublish: "2022-03-04",
      },
      {
        key: '15',
        avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg",
        username: "User16",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        dataOfPublish: "2022-03-05",
      },
      {
        key: '16',
        avatarUrl: "https://randomuser.me/api/portraits/women/6.jpg",
        username: "User17",
        content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        dataOfPublish: "2022-03-06",
      },
      {
        key: '17',
        avatarUrl: "https://randomuser.me/api/portraits/women/7.jpg",
        username: "User18",
        content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        dataOfPublish: "2022-03-07",
      }
]
