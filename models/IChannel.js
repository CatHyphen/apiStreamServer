"use strict";
export  default class IChannel{

  constructor(
    _id,
    Id_Account,
    Display_Name,
    BroadCast_Path,
    Bio,
    Profile_Picture,
    Profile_Banner,
    Mature_Content,
    Notification,
    Followers,
    Followings,
    Live_Title,
    Go_Live_Notification,
    Category,
    Tags,
    Language,
    CreatedAt,
    UpdatedAt
    )
    {
      this._id =_id;
      this.Id_Account= Id_Account;
      this.Display_Name = Display_Name;
      this.BroadCast_Path = BroadCast_Path;
      this.Bio = Bio;
      this.Profile_Picture = Profile_Picture;
      this.Profile_Banner=Profile_Banner;
      this.Mature_Content = Mature_Content;
      this.Notification = Notification;
      this.Followers = Followers;
      this.Followings= Followings;
      this.Live_Title = Live_Title;
      this.Go_Live_Notification = Go_Live_Notification;
      this.Category = Category;
      this.Tags = Tags;
      this.Language =Language;
      this.CreatedAt =CreatedAt;
      this.UpdatedAt =UpdatedAt;
    }

}