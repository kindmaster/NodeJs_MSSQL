/*  
declare @token varchar(max)
exec BNlogin '03016', '5632'
Select @token
*/
alter PROCEDURE dbo.BNlogin
 @ID	Varchar(50),
 @PW	Varchar(20)
AS  
BEGIN  

-- select PWDCOMPARE('5632',PWDENCRYPT('5632'))	=1 이면 일치
Declare @Token Varchar(Max)

IF Exists(Select * From Wusr01m where user_id = @ID And PWDCOMPARE(@PW,user_pwd)=1)
   Begin
     Select  Token = NEWID() From Wusr01m where user_id = @ID
   End
Else
  Begin
	Select Token = ''
  End
END  



--Select NEWID()