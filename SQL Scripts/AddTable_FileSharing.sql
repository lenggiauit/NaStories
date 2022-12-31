USE [NaStories]
GO

/****** Object:  Table [dbo].[BlogPost]    Script Date: 12/30/2022 5:15:01 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FileSharing](
	[Id] [uniqueidentifier] NOT NULL PRIMARY KEY ,
	[CreatedBy] [uniqueidentifier] NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NULL,
	[UpdatedBy] [uniqueidentifier] NULL,
	[Name] [nvarchar](250) NULL,
	[Category] [nvarchar](250) NULL,
	[Description] [nvarchar](250) NULL, 
	[Url] [nvarchar](350) NULL,
	[IsArchived] bit NULL)
 
 

