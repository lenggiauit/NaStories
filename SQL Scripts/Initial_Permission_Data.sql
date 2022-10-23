
GO
--- Delete from [dbo].[Permission]
--- Select * from [dbo].[Permission]
INSERT INTO [dbo].[Permission]
           ([Id]
           ,[Name]
           ,[Code]
           ,[Description]
           ,[IsActive]
           ,[CreatedDate] )
     VALUES
           --(NEWID()
           --,'Admin'
           --,'Admin'
           --,'Admin'
           --,1
           --,GETDATE()
           -- ),
			(NEWID()
           ,'CreateEditCategory'
           ,'CreateEditCategory'
           ,'CreateEditCategory'
           ,1
           ,GETDATE()
            ),
			(NEWID()
           ,'CreateEditBlogPost'
           ,'CreateEditBlogPost'
           ,'CreateEditBlogPost'
           ,1
           ,GETDATE()
            ),
			(NEWID()
           ,'ManageUser'
           ,'ManageUser'
           ,'ManageUser'
           ,1
           ,GETDATE()
            )
			
			, 
			(NEWID()
           ,'GetPrivateTalkList'
           ,'GetPrivateTalkList'
           ,'GetPrivateTalkList'
           ,1
           ,GETDATE()
            ) ,

			(NEWID()
           ,'UpdatePrivateTalkStatus'
           ,'UpdatePrivateTalkStatus'
           ,'UpdatePrivateTalkStatus'
           ,1
           ,GETDATE()
            ) ,

			(NEWID()
           ,'RemovePrivateTalk'
           ,'RemovePrivateTalk'
           ,'RemovePrivateTalk'
           ,1
           ,GETDATE()
            ) 

			, 
			(NEWID()
           ,'GetMockInterviewList'
           ,'GetMockInterviewList'
           ,'GetMockInterviewList'
           ,1
           ,GETDATE()
            ) ,

			(NEWID()
           ,'UpdateMockInterviewStatus'
           ,'UpdateMockInterviewStatus'
           ,'UpdateMockInterviewStatus'
           ,1
           ,GETDATE()
            ) ,

			(NEWID()
           ,'RemoveMockInterview'
           ,'RemoveMockInterview'
           ,'RemoveMockInterview'
           ,1
           ,GETDATE()
            ) 



GO


